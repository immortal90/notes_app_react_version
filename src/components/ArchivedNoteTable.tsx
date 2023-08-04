import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, Note } from "../store/types";
import { unarchiveNote } from "../store/actions";

const ArchivedNoteTable: React.FC = () => {
  const dispatch = useDispatch();
  const archivedNotes: Note[] = useSelector((state: AppState) =>
    state.notes.filter((note) => note.archived)
  );

  const handleUnarchiveNote = (noteId: string | number) => {
    dispatch(unarchiveNote(parseInt(noteId as string)));
  };

  return (
    <div>
      <h2>Архівовані замітки</h2>
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
          {archivedNotes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.timeOfCreation}</td>
              <td>{note.noteContent}</td>
              <td>{note.noteCategory}</td>
              <td>
                {note.datesMentioned.length > 0
                  ? note.datesMentioned.join(", ")
                  : ""}
              </td>
              <td>
                <button onClick={() => handleUnarchiveNote(note.id)}>
                  Розархівувати
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedNoteTable;
