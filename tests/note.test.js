import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insert_db: jest.fn(),
  get_db: jest.fn(),
  save_db: jest.fn(),
}));

const { insert_db, get_db, save_db } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insert_db.mockClear();
  get_db.mockClear();
  save_db.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["tag1", "tag2"];
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  insert_db.mockResolvedValue(data);

  const result = await newNote(note, tags);
  expect(result).toEqual(data);
});

test("get_db returns all the notes", async () => {
  const db = {
    notes: ["note1", "note2"],
  };

  get_db.mockResolvedValue(db);
  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("remove notes does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "hello g" },
    { id: 1, content: "hello g" },
    { id: 2, content: "hello g" },
  ];

  save_db.mockResolvedValue(notes);

  const removeid = 6;
  const result = await removeNote(removeid);
  expect(result).toBeUndefined();
});
