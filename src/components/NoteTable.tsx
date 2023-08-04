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
      <table className="content-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата створення</th>
            <th>Зміст</th>
            <th>Категорія</th>
            <th>Дата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.timeOfCreation}</td>
              <td>{note.noteContent}</td>
              <td>{note.noteCategory}</td>
              <td>
                {note.datesMentioned.length > 0
                  ? note.datesMentioned.map(formatDate).join(", ")
                  : ""}
              </td>
              <td>
                <button onClick={() => setEditingNote(note)}>Редагувати</button>
                {note.archived ? (
                  <button onClick={() => handleUnarchiveNote(note.id)}>
                    Відновити
                  </button>
                ) : (
                  <button onClick={() => handleArchiveNote(note.id)}>
                    Архівувати
                  </button>
                )}
                <button onClick={() => handleDeleteNote(note.id)}>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && <AddNoteForm onSave={handleAddNote} />}
      {!showAddForm && (
        <button onClick={() => setShowAddForm(true)}>Додати замітку</button>
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
