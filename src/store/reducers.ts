import {
  AppState,
  AppActionTypes,
  ADD_NOTE,
  EDIT_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_NOTE,
} from "./types";

const initialState: AppState = {
  notes: [
    {
      id: 1,
      timeOfCreation: "01.08.2023 11:00:00",
      noteContent: "Маю зубний прийом",
      noteCategory: "Task",
      datesMentioned: ["3/5/2021", "5/5/2021"],
      archived: false,
    },
    {
      id: 2,
      timeOfCreation: "02.08.2023 12:00:00",
      noteContent: "Похід у гори",
      noteCategory: "Idea",
      datesMentioned: [""],
      archived: false,
    },
    {
      id: 3,
      timeOfCreation: "03.08.2023 13:00:00",
      noteContent: "Пройти стажування",
      noteCategory: "Task",
      datesMentioned: ["4/5/2021", "6/5/2021"],
      archived: false,
    },
    {
      id: 4,
      timeOfCreation: "04.08.2023 14:00:00",
      noteContent: "Влаштуватись працювати в RADENCY",
      noteCategory: "Idea",
      datesMentioned: [""],
      archived: false,
    },
    {
      id: 5,
      timeOfCreation: "05.08.2023 15:00:00",
      noteContent: "Відвідати батьків",
      noteCategory: "Task",
      datesMentioned: ["5/5/2021", "7/5/2021"],
      archived: false,
    },
    {
      id: 6,
      timeOfCreation: "06.08.2023 16:00:00",
      noteContent: "Гра у футбол",
      noteCategory: "Idea",
      datesMentioned: [""],
      archived: false,
    },
    {
      id: 7,
      timeOfCreation: "07.08.2023 17:00:00",
      noteContent: "Поїздка у Київ",
      noteCategory: "Idea",
      datesMentioned: [""],
      archived: false,
    },
  ],
};

const appReducer = (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload ? { ...note, archived: true } : note
        ),
      };
    case UNARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload ? { ...note, archived: false } : note
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

export default appReducer;
