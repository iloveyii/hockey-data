import dotenv from "dotenv";
import boxen from "boxen";
import chalk from "chalk";

import { Database } from "./src/models/base/Database";
import runCommand from "./src/console/sensor_data";

// ----------------------------------
// Environment setup
// ----------------------------------
dotenv.config({ path: ".env" });
const {
  API_URL = "http://localhost",
  API_PORT = 5500,
  SESS_NAME = "sid",
  SESS_SECRET = "top-secret",
  SESS_LIFETIME = 1000 * 60 * 60 * 2, // 2 hrs
  DB_NAME = "rdigital",
  DB_USER = "",
  DB_PASS = "",
} = process.env;

// ----------------------------------
// Connect to DB
// ----------------------------------
const db = new Database(DB_NAME, DB_USER, DB_PASS);
const db_connected = db.connect();
console.log("DB DB_NAME, DB_USER, DB_PASS", DB_NAME, DB_USER, DB_PASS);

// ----------------------------------
// Run sensors command
// ----------------------------------
setTimeout(() => {
  runCommand(Database.database, 5000);
}, 1000 * 120);
