import Mongo from "./base/Mongo";
import { ConditionI } from "../interfaces";
import { exec, spawn } from "child_process";
import { io } from "../../server";

type DeployT = {
  _id?: string;
  id: number;
  email: string;
  name: string;
  type: string;
  github_url: string;
  shell: string;
};

const COLLECTION = "deploys";

class Deploy extends Mongo {
  constructor(private logo?: DeployT) {
    super(COLLECTION, logo);
  }

  rules() {
    return {
      id: "required",
      email: "required",
      name: "required",
      type: "required",
      github_url: "required",
    };
  }

  async update(condition: ConditionI) {
    // Check if deploy or update
    if (this.data["action"] && this.data["action"] === "start_deploy") {
      console.log("Starting deploy");
      await this.startDeploy();
      this.data["action"] = "deploy_done";
      await super.update(condition);
      this.setResponse(true, { msg: "Deploy started" });
      return this;
    }
    return super.update(condition);
  }

  async startDeploy() {
    const { shell, github_url, name } = this.data;
    let arrShell = shell.trim().split("\n");
    let script = "";
    const repoPath = `/home/alex/projects/tmpdeploy/${name}`;
    arrShell.forEach((cmd: string) => {
      if (cmd.includes("cd ")) {
        const [cd, dir] = cmd.split(" ");
        script += `cd ${repoPath}/${dir} && `;
      } else {
        script += `${cmd} && `;
      }
    });
    script += " ls ";
    script = `cd /home/alex/projects/tmpdeploy/${name} && ` + script;
    console.log("Shell", script);
    console.log("github_url", github_url);

    let sp = spawn(
      `/home/alex/projects/tests/esmg/hockey-data/deploy/clone.sh ${github_url} ${name} && ${script}`,
      { shell: true }
    );
    sp.stdout.on("data", (data: any) => {
      const msg = data.toString("utf8");
      console.log("DATA : ", msg);
      if (msg.includes("script")) {
      }
      io.sockets.emit("deploy", { msg });
    });
    sp.stderr.on("error", (error: any) =>
      console.log("ERROR STD : ", error.toString("utf8"))
    );
    sp.on("error", (error: any) =>
      console.log("ERROR : ", error.toString("utf8"))
    );
    sp.on("close", (code: any) =>
      console.log(`child process exited with code ${code}`)
    );
  }
}

export default Deploy;
