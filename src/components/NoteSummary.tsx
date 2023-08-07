import React from "react";
import { useSelector } from "react-redux";
import { AppState, Note } from "../store/types";

const NoteSummary: React.FC = () => {
  const notes: Note[] = useSelector((state: AppState) => state.notes);

  const noteCategories = {
    Task: 0,
    "Random Thought": 0,
    Idea: 0,
  };

  notes.forEach((note) => {
    if (note.noteCategory in noteCategories) {
      noteCategories[note.noteCategory]++;
    }
  });

  const totalNotes = notes.length;
  const archivedNotes = notes.filter((note) => note.archived).length;

  return (
    <div>
      <h2 className="my-1">Звіт про замітки</h2>
      <table className="border-separate border border-slate-400 bg-stone-100">
        <thead>
          <tr>
            <th className="border border-slate-400 bg-red-200">Категорія</th>
            <th className="border border-slate-400 bg-red-200">Кількість</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-400">
              Загальна кількість заміток
            </td>
            <td className="border border-slate-400">{totalNotes}</td>
          </tr>
          <tr>
            <td className="border border-slate-400">
              Кількість архівованих заміток
            </td>
            <td className="border border-slate-400">{archivedNotes}</td>
          </tr>
          {/* Перебирайте об'єкт noteCategories для створення рядків таблиці */}
          {Object.entries(noteCategories).map(([category, count]) => (
            <tr key={category}>
              <td className="border border-slate-400">
                Кількість заміток з категорією "{category}"
              </td>
              <td className="border border-slate-400">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteSummary;
