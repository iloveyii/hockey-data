import sensor_data, {
  roundTimestamp,
  createRandomSensorData,
} from "../console/sensor_data";
import Condition from "../models/base/Condition";
import { ObjectId } from "mongodb";
import SensorData from "../models/SensorData";
import DeviceLog from "../models/DeviceLog";

import moment from "moment";
import { response } from "express";

/**
 * Find average of different attribtutes from rows
 * @param rows of data
 */
function findAverage(rows: any) {
  // Average data
  const average = {
    temperature: 0,
    co2: 0,
    humidity: 0,
    pressure: 0,
  };
  rows.forEach((row: any) => {
    average["temperature"] += row.temperature.value;
    average["co2"] += row.co2.value;
    average["humidity"] += row.humidity.value;
    average["pressure"] += row.pressure.value;
  });

  average.temperature = Math.round(average.temperature / rows.length);
  average.co2 = Math.round(average.co2 / rows.length);
  average.humidity = Math.round(average.humidity / rows.length);
  average.pressure = Math.round(average.pressure / rows.length);
  return average;
}

/**
 * Stats for day, week, month intervals
 * @param user_id
 * @param startTimeStamp
 * @param endTimeStamp
 */
export async function statsForUserWithInterval(user_id: string) {
  const data = createRandomSensorData();
  const timestamp = roundTimestamp(1000 * 60); // 1 min
  const condition = new Condition({
    where: {
      user_id: new ObjectId(user_id),
      /**
      timestamp: {
        $gte: parseInt(startTimeStamp),
        $lte: parseInt(endTimeStamp),
      },  */
    },
  });
  const model = new SensorData({ user_id, data, timestamp });
  await model.read(condition);
  // Average data
  const average2 = {
    temperature: { value: 0, unit: "°C" },
    co2: { value: 0, unit: "mol" },
    humidity: { value: 0, unit: "gm³" },
    pressure: { value: 0, unit: "pas" },
  };
  const average = {
    temperature: 0,
    co2: 0,
    humidity: 0,
    pressure: 0,
  };
  // Weekly, daily averages, consupmtion number of hours on per day, week, month
  const weeks: any = {};
  const days: any = {};
  if (model.response.success) {
    model.response.data.forEach((sensor_data: any) => {
      const { data, timestamp } = sensor_data;
      const weekNumber = moment(timestamp).week();
      const dayNumber = moment(timestamp).date();
      console.log("dayNumber", dayNumber);
      average["temperature"] += data.temperature.value;
      average["co2"] += data.co2.value;
      average["humidity"] += data.humidity.value;
      average["pressure"] += data.pressure.value;
      if (days[dayNumber]) {
        days[dayNumber].push(data);
      } else {
        days[dayNumber] = [data];
      }

      if (weeks[weekNumber]) {
        weeks[weekNumber].push(data);
      } else {
        weeks[weekNumber] = [data];
      }
    });
    average2.temperature.value = Math.round(
      average.temperature / model.response.data.length
    );
    average2.co2.value = Math.round(average.co2 / model.response.data.length);
    average2.humidity.value = Math.round(
      average.humidity / model.response.data.length
    );
    average2.pressure.value = Math.round(
      average.pressure / model.response.data.length
    );

    Object.keys(weeks).forEach((weekNumber: any) => {
      const average = findAverage(weeks[weekNumber]);
      weeks[weekNumber] = { average };
    });

    Object.keys(days).forEach((dayNumber: any) => {
      const average = findAverage(days[dayNumber]);
      days[dayNumber] = { average };
    });
  }
  const usage = await getDeviceLog();
  const stats = { average: average2, weeks, days, usage }; // average for all data set, average for all weeks, average for days of month, deviceLog is Usage
  return stats;
}

/**
 * Find the usage / consumption from device_logs colelction
 */
export async function getDeviceLog() {
  const average = {
    door: { closeTime: 0, openTime: 0, onTime: 0 },
    stove: { closeTime: 0, openTime: 0, onTime: 0 },
    television: { closeTime: 0, openTime: 0, onTime: 0 },
    light: { closeTime: 0, openTime: 0, onTime: 0 },
  };
  const deviceLog = new DeviceLog(undefined);
  await deviceLog.read(undefined, { timestamp: -1 });
  console.log("LIGHT data len", deviceLog.response.data.length);

  if (deviceLog.response.success) {
    // iterate over array and calcaulate diff between n-1 close and n open as ON_TIME
    let offTime, onTime;
    const datas: any = deviceLog.response.data;
    for (let i = 0; i < datas.length; i++) {
      const data: any = datas[i];
      /**
       * find closeTime of device first and note it
       * then find openTime of that device and do : closeTime - openTime = +ON_TIME
       * make closeTime = 0
       */
      switch (data.device) {
        case "door":
          if (data.command === "close") {
            average.door.closeTime = 1; // On_Time does not make sense here, therefore count number of times
          }
          if (data.command === "open" && average.door.closeTime !== 0) {
            average.door.onTime = average.door.onTime + average.door.closeTime;
            average.door.closeTime = 0; // reset it
          }
          break;
        case "stove":
          if (data.command === "close") {
            average.stove.closeTime = data.timestamp;
          }
          if (data.command === "open" && average.stove.closeTime !== 0) {
            average.stove.onTime =
              average.stove.onTime + (average.stove.closeTime - data.timestamp);
            average.stove.closeTime = 0; // reset it
          }
          break;
        case "television":
          if (data.command === "close") {
            average.television.closeTime = data.timestamp;
            console.log("TV Close", data, average);
          }
          if (data.command === "open" && average.television.closeTime !== 0) {
            average.television.onTime =
              average.television.onTime +
              (Number(average.television.closeTime) - Number(data.timestamp));
            average.television.closeTime = 0; // reset it
            console.log("TV Open", data, average);
          }
          break;
        case "light":
          if (data.command === "close") {
            average.light.closeTime = data.timestamp;
          }
          if (data.command === "open" && average.light.closeTime !== 0) {
            average.light.onTime =
              average.light.onTime +
              (Number(average.light.closeTime) - Number(data.timestamp));
            average.light.closeTime = 0; // reset it
          }
          break;
      }
    }
  }

  // return deviceLog.response;
  return average;
}

export function getInterval(duration: string) {
  let startTimeStamp, endTimeStamp;
  let from_date: any, to_date: any;
  const today = moment();

  switch (duration) {
    case "week":
      from_date = today.clone().startOf("isoWeek");
      to_date = today.clone().endOf("isoWeek");
      break;
    case "month":
      from_date = today.clone().startOf("month");
      to_date = today.clone().endOf("month");
      break;
    case "day":
      from_date = today.clone().startOf("day");
      to_date = today.clone().endOf("day");
      break;
  }

  startTimeStamp = from_date.unix() * 1000;
  endTimeStamp = to_date.unix() * 1000;

  /**
  console.log({
    startTimeStamp,
    endTimeStamp,
    start: from_date.toString(),
    end: to_date.toString(),
  }); */

  return { startTimeStamp, endTimeStamp };
}

// getInterval("month");

// Weekly average -done
// Daily
