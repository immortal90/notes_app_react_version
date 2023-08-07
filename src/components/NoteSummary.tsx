import React from "react";
import { useSelector } from "react-redux";
import { AppState, Note } from "../store/types";

const NoteSummary: React.FC = () => {
  const notes: Note[] = useSelector((state: AppState) => state.notes);

  const totalNotes = notes.length;
  const archivedNotes = notes.filter((note) => note.archived).length;
  const taskNotes = notes.filter((note) => note.noteCategory === "Task").length;
  const randomThoughtNotes = notes.filter(
    (note) => note.noteCategory === "Random Thought"
  ).length;
  const ideaNotes = notes.filter((note) => note.noteCategory === "Idea").length;

  return (
    <div>
      <h2>Звіт про замітки</h2>
      <table className="content-table">
        <thead>
          <tr>
            <th>Категорія</th>
            <th>Кількість</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Загальна кількість заміток</td>
            <td>{totalNotes}</td>
          </tr>
          <tr>
            <td>Кількість архівованих заміток</td>
            <td>{archivedNotes}</td>
          </tr>
          <tr>
            <td>Кількість заміток з категорією "Task"</td>
            <td>{taskNotes}</td>
          </tr>
          <tr>
            <td>Кількість заміток з категорією "Random Thought"</td>
            <td>{randomThoughtNotes}</td>
          </tr>
          <tr>
            <td>Кількість заміток з категорією "Idea"</td>
            <td>{ideaNotes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NoteSummary;
