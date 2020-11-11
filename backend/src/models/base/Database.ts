import { MongoClient, ObjectId } from "mongodb";


export class Database {
    static database: any = undefined;
    private mongo : any;

    constructor(private dbname: string, private dbuser: string, private dbpass: string) {
        if(dbuser && dbpass) {
            this.mongo = {
                url: `mongodb://${dbuser}:${dbpass}@localhost:27017/${dbname}`, // conn with auth
                mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            };
        } else {
            this.mongo = {
                url: `mongodb://localhost:27017/${dbname}`, // conn with auth
                mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            };
        }
    }

    async connect() {
        if (Database.database !== undefined) return Database.database;
        try {
            const db = await MongoClient.connect(this.mongo.url, this.mongo.mongoOptions);
            console.log("Mongodb connected to : " + this.dbname);
            Database.database = db;
        } catch (error) {
            console.log("Error : ", error);
        }
        // return Database.database;
        return this.dbname;
    }

    async db() {
        await this.connect();
        return Database.database;
    }
}


/**
const DB_NAME="rdigital"; const DB_USER="rdigital"; const DB_PASS="rdigital";
const db = new Database(DB_NAME, DB_USER, DB_PASS);
db.connect();
console.log("DB");
db.connect();
*/
