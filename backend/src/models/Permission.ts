import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type DoorT = {
    _id?: string;
    name: string;
    email: string;
    building: string;
    room_number: string;
    status: string;
};

const COLLECTION = "permissions";

class Permission extends Mongo {

    constructor(private door?: DoorT) {
        super(COLLECTION, door);
    }

    rules() {
        return {
            name: "required",
            email: "required|email",
            building: "required",
            room_number: "required",
            status: "required"
        };
    }
}

export default Permission;
