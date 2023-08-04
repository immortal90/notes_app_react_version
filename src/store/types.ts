export interface Note {
  id: string | number;
  timeOfCreation: string;
  noteContent: string;
  noteCategory: "Task" | "Random Thought" | "Idea" | NoteCategory;
  datesMentioned: string[];
  archived: boolean;
}
export enum NoteCategory {
  Task = "Task",
  RandomThought = "Random Thought",
  Idea = "Idea",
}

export const TaskCategory = "Task";
export const RandomThoughtCategory = "Random Thought";
export const IdeaCategory = "Idea";

export interface AppState {
  notes: Note[];
}

export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const UNARCHIVE_NOTE = "UNARCHIVE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

export interface EditNoteAction {
  type: typeof EDIT_NOTE;
  payload: Note;
}

export interface ArchiveNoteAction {
  type: typeof ARCHIVE_NOTE;
  payload: number;
}

export interface UnarchiveNoteAction {
  type: typeof UNARCHIVE_NOTE;
  payload: number;
}

export interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  payload: number;
}

export type AppActionTypes =
  | AddNoteAction
  | EditNoteAction
  | ArchiveNoteAction
  | UnarchiveNoteAction
  | DeleteNoteAction;
