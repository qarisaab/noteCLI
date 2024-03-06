import fs from "fs/promises";

const read = async () => {
  console.log(await fs.readFile("./src/index.js", "utf8"));
};

read();
