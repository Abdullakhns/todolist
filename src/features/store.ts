import { combineReducers, createStore } from "redux";
import { notesReducer } from "./notes/reducer";

export const store = createStore(
  combineReducers({
    notes: notesReducer,
  })
);

export type State = ReturnType<typeof store.getState>;
