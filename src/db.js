import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assuming db.json is in the root directory
const db_path = join(__dirname, "..", "db.json");

const get_db = async () => {
  const db = await fs.readFile(db_path, "utf-8");
  return JSON.parse(db);
};

const save_db = async (note) => {
  await fs.writeFile(db_path, JSON.stringify(note, null, 2));
  return note;
};

const insert_db = async (note) => {
  const db = await get_db();
  db.notes.push(note);
  await save_db(db);
  return note;
};

export { get_db, save_db, insert_db };
