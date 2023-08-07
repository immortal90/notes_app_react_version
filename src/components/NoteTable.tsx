import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, Note } from "../store/types";
import {
  addNote,
  editNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../store/actions";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { format } from "date-fns";
import ArchivedNoteTable from "./ArchivedNoteTable";

const NoteTable: React.FC = () => {
  const dispatch = useDispatch();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [lastId, setLastId] = useState<number>(7);

  const notes = useSelector((state: AppState) => state.notes);

  const handleAddNote = (newNote: Note) => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd-MM-yyyy HH:mm:ss");

    const noteWithIdAndDate: Note = {
      ...newNote,
      id: lastId + 1,
      timeOfCreation: formattedDate,
    };

    dispatch(addNote(noteWithIdAndDate));
    setShowAddForm(false);
    setLastId(lastId + 1);
  };

  const handleSaveNote = (editedNote: Note) => {
    const formattedDates = editedNote.datesMentioned.map((date) => {
      const [day, month, year] = date.split(/[.,/\s]+/);
      return `${year}-${month}-${day}`;
    });

    const updatedNote: Note = {
      ...editedNote,
      datesMentioned: formattedDates,
    };

    dispatch(editNote(updatedNote));

    const formattedDatesForDisplay = formattedDates.map((date) => {
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    });

    setEditingNote({
      ...updatedNote,
      datesMentioned: formattedDatesForDisplay,
    });

    setEditingNote(null);
  };

  const handleArchiveNote = (noteId: string | number) => {
    dispatch(archiveNote(parseInt(noteId as string)));
  };

  const handleUnarchiveNote = (noteId: string | number) => {
    dispatch(unarchiveNote(parseInt(noteId as string)));
  };

  const handleDeleteNote = (noteId: string | number) => {
    dispatch(deleteNote(parseInt(noteId as string)));
  };

  const formatDate = (date: string | undefined) => {
    if (date) {
      const parsedDate = new Date(date);
      const day = parsedDate.getDate().toString().padStart(2, "0");
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = parsedDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  };

  return (
    <div>
      <table className="border-separate border border-slate-400 bg-stone-100">
        <thead>
          <tr>
            <th className="border border-slate-300 bg-red-200">ID</th>
            <th className="border border-slate-300 bg-red-200">
              Дата створення
            </th>
            <th className="border border-slate-300 bg-red-200">Зміст</th>
            <th className="border border-slate-300 bg-red-200">Категорія</th>
            <th className="border border-slate-300 bg-red-200">Дата</th>
            <th className="border border-slate-300 bg-red-200">Дії</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="border border-slate-300">{note.id}</td>
              <td className="border border-slate-300">{note.timeOfCreation}</td>
              <td className="border border-slate-300">{note.noteContent}</td>
              <td className="border border-slate-300">{note.noteCategory}</td>
              <td className="border border-slate-300">
                {note.datesMentioned.length > 0
                  ? note.datesMentioned.map(formatDate).join(", ")
                  : ""}
              </td>
              <td className="border border-slate-300">
                <button
                  className="bg-sky-500 hover:bg-sky-700 mx-1 px-4 rounded-lg cursor-pointer"
                  onClick={() => setEditingNote(note)}
                >
                  Редагувати
                </button>
                {note.archived ? (
                  <button
                    className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring
                   focus:ring-violet-300 mx-1 px-4 rounded-lg cursor-pointer"
                    onClick={() => handleUnarchiveNote(note.id)}
                  >
                    Відновити
                  </button>
                ) : (
                  <button
                    className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring
                   focus:ring-violet-300 mx-1 px-4 rounded-lg cursor-pointer"
                    onClick={() => handleArchiveNote(note.id)}
                  >
                    Архівувати
                  </button>
                )}
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 mx-1 px-4 rounded-lg cursor-pointer"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && <AddNoteForm onSave={handleAddNote} />}
      {!showAddForm && (
        <button
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring
        focus:ring-violet-300 my-1 px-4 rounded-lg cursor-pointer"
          onClick={() => setShowAddForm(true)}
        >
          Додати замітку
        </button>
      )}
      {editingNote !== null && (
        <EditNoteForm
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => setEditingNote(null)}
        />
      )}
      <ArchivedNoteTable />
    </div>
  );
};

export default NoteTable;
