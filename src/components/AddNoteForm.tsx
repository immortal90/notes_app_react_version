import React, { useState } from "react";
import { Note, NoteCategory } from "../store/types";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

interface AddNoteFormProps {
  onSave: (newNote: Note) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSave }) => {
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("Task");
  const [datesMentioned, setDatesMentioned] = useState<string[]>([]);

  const handleNoteContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoteContent(event.target.value);
  };

  const handleNoteCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNoteCategory(event.target.value as NoteCategory);
  };

  const handleDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDatesMentioned(event.target.value.split(",").map((date) => date.trim()));
  };

  const handleDateInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowedCharacters = /[0-9,.\-/\s]/;
    if (!allowedCharacters.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: uuid(),
      timeOfCreation: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
      noteContent,
      noteCategory: noteCategory as NoteCategory,
      datesMentioned,
      archived: false,
    };

    onSave(newNote);

    setNoteContent("");
    setNoteCategory("Task");
    setDatesMentioned([]);
  };

  return (
    <form className="edit-note-form-container" onSubmit={handleSaveNote}>
      <div>
        <label htmlFor="noteContent">Зміст замітки:</label>
        <input
          type="text"
          id="noteContent"
          value={noteContent}
          onChange={handleNoteContentChange}
        />
      </div>
      <div>
        <label htmlFor="noteCategory">Категорія замітки:</label>
        <select
          id="noteCategory"
          value={noteCategory}
          onChange={handleNoteCategoryChange}
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </div>
      <div>
        <label htmlFor="dateInput">Дата виконання або переносу</label>
        <input
          type="text"
          id="dateInput"
          value={datesMentioned.join(", ")}
          onChange={handleDateInputChange}
          onKeyUp={handleDateInputKeyPress}
        />
      </div>
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddNoteForm;
