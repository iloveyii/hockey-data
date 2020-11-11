import Mongo from "./base/Mongo";
import { Database } from "./base/Database";


type ServiceT = {
    id?: string;
    name: string;
    price: string;
};

const COLLECTION = "services";

class Service extends Mongo {
    constructor(database: Database, private service?: ServiceT) {
        super(database, COLLECTION, service);
    }

    rules() {
        return {
            name: "required",
            price: "required"
        };
    }
}

export default Service;
