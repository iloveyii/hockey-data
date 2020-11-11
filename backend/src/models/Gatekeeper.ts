import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import DeviceLog from "./DeviceLog";
import axios from "axios";

type PermissionT = {
  _id?: string;
  building: string;
  room_number: string;
  status: string;
  command: string;
  device?: string;
};

const COLLECTION = "permissions";

class Gatekeeper extends Mongo {
  constructor(private permission?: PermissionT) {
    super(COLLECTION, permission);
  }

  rules() {
    return {
      building: "required",
      room_number: "required",
      status: "required",
      command: "required",
    };
  }

  makeApiRequestToDevice(model: any) {
    const permission: any = this.permission
      ? this.permission
      : {
          _id: "",
          building: "",
          room_number: "",
          status: "",
          command: "open",
          device: "",
        };
    console.log("Permission in Model", permission);

    const queryString = Object.keys(permission)
      .map((key) => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(permission[key])
        );
      })
      .join("&");
    console.log("queryString in Model", queryString);
    const url = `http://localhost:7700/api/v1/gatekeepers/${permission.command}&${queryString}`;
    axios.get(url).then(async (res: any) => {
      console.log("Response from device ", res.data);
      if (true || res.data.cmdStatus === true) {
        const fields = {
          building: permission.building,
          room_number: permission.room_number,
          command: permission.command,
          device: permission.device,
          timestamp: Date.now(),
        };
        const deviceLog = new DeviceLog(fields);
        await deviceLog.create();
        console.log("DeviceLog", deviceLog.response);
      }
    });
  }

  async update(condition?: ConditionI) {
    await this.read(condition);

    if (this.response.success) {
      const model = this.response.data[0];
      // Opening gateway to open Gatekeeper with uri
      console.log("Gatekeeper opened door", model);
      this.makeApiRequestToDevice(model);
      this.setResponse(true, [{ command: "success" }]);
    } else {
      console.log("Gatekeeper cannot open door", this.response);

      this.setResponse(false, [{ command: "Cannot open door" }]);
    }

    return this;
  }
}

export default Gatekeeper;
