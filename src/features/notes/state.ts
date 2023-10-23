export interface Note {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
}

export interface NotesState {
  notes: Note[];
}