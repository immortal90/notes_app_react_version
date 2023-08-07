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
      <h2 className="my-2">Архівовані замітки</h2>
      <table className="border-separate border border-slate-400 bg-stone-100">
        <thead>
          <tr>
            <th className="border border-slate-500 bg-red-200">ID</th>
            <th className="border border-slate-500 bg-red-200">
              Дата створення
            </th>
            <th className="border border-slate-500 bg-red-200">Зміст</th>
            <th className="border border-slate-500 bg-red-200">Категорія</th>
            <th className="border border-slate-500 bg-red-200">Дата</th>
            <th className="border border-slate-500 bg-red-200">Дії</th>
          </tr>
        </thead>
        <tbody>
          {archivedNotes.map((note) => (
            <tr key={note.id}>
              <td className="border border-slate-500">{note.id}</td>
              <td className="border border-slate-500">{note.timeOfCreation}</td>
              <td className="border border-slate-500">{note.noteContent}</td>
              <td className="border border-slate-500">{note.noteCategory}</td>
              <td className="border border-slate-500">
                {note.datesMentioned.length > 0
                  ? note.datesMentioned.join(", ")
                  : ""}
              </td>
              <td className="border border-slate-500">
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 mx-1 px-4 rounded-lg cursor-pointer"
                  onClick={() => handleUnarchiveNote(note.id)}
                >
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
