import SensorData from "../models/SensorData";
import Condition from "../models/base/Condition";
import Users from "../models/User";
import moment from "moment";

const getAllUsers = async (db: any) => {
  const users = new Users(undefined);
  users.database = db;
  await users.read();
  const response = users.response;
  console.log("users", response);
  if (response.success) {
    return response.data;
  } else {
    return [];
  }
};

const getRandomNumber = (
  min: number,
  max: number,
  decimal: boolean = false
) => {
  let r = Math.random() * (max - min + 1) + min;
  if (decimal === false) {
    r = Math.floor(r);
  }
  return r;
};

export const createRandomSensorData = () => {
  const sensorData = {
    temperature: { value: getRandomNumber(1, 40), unit: "°C" },
    co2: { value: getRandomNumber(300, 1500), unit: "mol" },
    humidity: { value: getRandomNumber(20, 40), unit: "gm³" },
    pressure: { value: getRandomNumber(500, 1500), unit: "pas" },
  };

  return sensorData;
};

export const roundTimestamp = (seconds: number) => {
  const timestamp = Date.now();
  const remainder = timestamp % seconds;
  const rounded = timestamp - remainder;
  console.log(
    "ROUNDED ",
    moment(timestamp).format("YYYY-MM-DD h:mm:ss a"),
    moment(rounded).format("YYYY-MM-DD h:mm:ss a")
  );
  return rounded;
};

const createSensorData = async (db: any, users: any) => {
  console.log("All users", users);
  // Create random data
  const timestamp = roundTimestamp(1000 * 60); // 1 min
  // Create model
  users.forEach((user: any) => {
    const condition = new Condition({
      where: { user_id: user._id, timestamp },
    });
    const data = createRandomSensorData();
    const sensorData = new SensorData({ user_id: user.id, data, timestamp });
    sensorData.createIfNotExist(condition);
  });
};

const runCommand = async (db: any, interval: number) => {
  // Get All users IDs
  const users = await getAllUsers(db);

  setInterval(() => {
    createSensorData(db, users);
    process.stdout.write(".");
  }, interval);
};

export default runCommand;
