import React, { useState } from "react";
import { Note, NoteCategory } from "../store/types";

interface EditNoteFormProps {
  note: Note;
  onSave: (editedNote: Note) => void;
  onClose: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({
  note,
  onSave,
  onClose,
}) => {
  const [noteContent, setNoteContent] = useState(note.noteContent);
  const [noteCategory, setNoteCategory] = useState<NoteCategory>(
    note.noteCategory as NoteCategory
  );
  const [dateInput, setDateInput] = useState(note.datesMentioned.join(", "));

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
    const inputValue = event.target.value;
    const allowedCharactersRegex = /^[0-9.,\s/-]*$/;

    if (!allowedCharactersRegex.test(inputValue)) {
      return;
    }

    setDateInput(inputValue);
  };

  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();

    const dates = dateInput.split(",").map((date) => date.trim());
    const nonEmptyDates = dates.filter((date) => date !== "");

    const editedNote: Note = {
      ...note,
      noteContent,
      noteCategory: noteCategory as NoteCategory,
      datesMentioned: nonEmptyDates,
    };

    onSave(editedNote);
    onClose();
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
          value={dateInput}
          onChange={handleDateInputChange}
        />
      </div>
      <button type="submit">Зберегти</button>
      <button type="button" onClick={onClose}>
        Скасувати
      </button>
    </form>
  );
};

export default EditNoteForm;
