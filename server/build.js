/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs-extra");
const childProcess = require("child_process");

/**
 * @ignore
 */
try {
  // Remove current build
  fs.removeSync("./dist/");
  // Transpile the typescript files
  const proc = childProcess.exec("tsc --build tsconfig.prod.json");
  proc.on("close", (code) => {
    console.log("Successfully build application!");
    if (code !== 0) {
      throw Error("Build failed");
    }
  });
} catch (err) {
  console.log(err);
}
