import { privateDecrypt } from "crypto";
import fs from "fs";

const projectsDir = "./generated_projects";

// Example A:
// {
//   "project_name": "project_name",
//   "files": {
//     "index.html": {
//       "input": "<html>'Hello World'</html>",
//       "dir": "src"
//     },
//     "css.html": {
//       "input": "div { color: red; }",
//       "dir": "src"
//     },
//     "js.html": {
//       "input": "console.log('Hello World')",
//       "dir": "src"
//     },
//     "run.sh": {
//       "input": "bin/bash open index.html",
//       "dir": "src"
//     }
//   }
// }

class Project {
  constructor(projectInfo) {
    this.info = projectInfo;
    this.projectPath = `${projectsDir}/${this.info.projectName}_${Date.now()}`;
  }

  create() {
    console.log(`Running project generation ${this.info.project_name}`);
    this.#createProjectPath();
    this.#writeProjectInfo();
    this.#createProjectFiles();
  }

  #createProjectPath() {
    if (!fs.existsSync(this.projectPath)) {
      fs.mkdirSync(this.projectPath, (err) => {
        console.error(err);
      });
    }
  }

  #writeProjectInfo() {
    fs.writeFileSync(
      `${projectsDir}/projectInfo.json`,
      this.info.toString(),
      (err) => {
        console.error(err);
      }
    );
  }

  #createProjectFiles() {
    for (const file in this.info.files) {
      const fileDir = `${this.projectPath}/${this.info.files[file].dir}`;
      const fileInput = this.info.files[file].input;

      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, (err) => {
          console.error(err);
        });
      }

      fs.writeFileSync(`${fileDir}/${file}`, fileInput, (err) => {
        console.error(err);
      });
    }
  }
}

export class ProjectCreator {
  constructor() {}

  call(projectInfo) {
    new Project(projectInfo).create();
  }
}
