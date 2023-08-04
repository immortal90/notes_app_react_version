import { Note } from "./types";

export const addNote = (note: Note) => {
  return {
    type: "ADD_NOTE",
    payload: note,
  };
};

export const editNote = (editedNote: Note) => {
  return {
    type: "EDIT_NOTE",
    payload: editedNote,
  };
};

export const archiveNote = (noteId: number) => {
  return {
    type: "ARCHIVE_NOTE",
    payload: noteId,
  };
};

export const unarchiveNote = (noteId: number) => {
  return {
    type: "UNARCHIVE_NOTE",
    payload: noteId,
  };
};

export const deleteNote = (noteId: number) => {
  return {
    type: "DELETE_NOTE",
    payload: noteId,
  };
};
