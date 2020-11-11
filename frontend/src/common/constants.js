const apiServer =
  process.env.API_URL && process.env.API_PORT
    ? process.env.API_URL + ":" + process.env.API_PORT
    : "/api/v1";
console.log("apiServer:", apiServer);

const statuses = {
  NEW: 1,
  CREATED: 2,
  FINISHED: 3,
  UNFINISHED: 4,
};

export { apiServer, statuses };

console.log("Process.env : ", process.env.serverIp);
