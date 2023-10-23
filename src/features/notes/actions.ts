import { Note } from "./state";

export type Action = {
  type: "ADD_NOTE" | "REMOVE_NOTE" | "UPDATE_NOTE" | "COMPLETED_NOTE" | "NOTE_PRIORITY";
  payload: any;
};

export const addNote = ({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: number;
}) => ({
  type: "ADD_NOTE",
  payload: { title, description, priority },
});

export const removeNote = (id: number) => ({
  type: "REMOVE_NOTE",
  payload: id,
});

export const updateNote = (note: Note) => ({
  type: "UPDATE_NOTE",
  payload: note,
});

export const changeIsCompleted = ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => ({
  type: "COMPLETED_NOTE",
  payload: { id, completed },
});
