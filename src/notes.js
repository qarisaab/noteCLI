import { get_db, save_db, insert_db } from "./db.js";

export const newNote = async (note, tags) => {
  const data = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insert_db(data);
  return data;
};

export const getAllNotes = async () => {
  const db = await get_db();
  return db.notes;
};

export const findNote = async (string) => {
  const db = await getAllNotes();
  return db.filter((note) =>
    note.content.toLowerCase().includes(string.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await save_db({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  return await save_db({ notes: [] });
};
