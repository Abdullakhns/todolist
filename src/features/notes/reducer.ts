import { Action } from "./actions";
import { Note, NotesState } from "./state";

const initialState: NotesState = {
  notes: [],
};

export const notesReducer = (
  state: NotesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: state.notes.length,
            title: action.payload.title,
            description: action.payload.description,
            priority: action.payload.priority,
            completed: false
          } as Note,
        ],
      };
    }

    case "REMOVE_NOTE": {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    }

    case "UPDATE_NOTE": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority
              } as Note
            : note
        ),
      };
    }

    case "COMPLETED_NOTE": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, completed: action.payload.completed as boolean } as Note
            : note
        ),
      };
    }

    default:
      return state;
  }
};
