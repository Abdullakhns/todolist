import { ChangeEvent, FC, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Note } from "../../features/notes/state";
import styles from "./new-note-form.module.css";

type PropsTypes = {
  isEdit?: boolean;
  note?: Note;
  onSubmit: (note: {
    id?: number;
    title: string;
    description: string;
    priority: number;
  }) => void;
};

const NewNoteForm: FC<PropsTypes> = ({ isEdit, note, onSubmit }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setError(null);

  };

  const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(+e.target.value);

    if (!error) return

    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() && description.trim() !== "") {
      onSubmit({ id: note?.id, title, description, priority });
      navigate(-1);
    } else {
      setError("Your note should have a title and description.");
    }
  };

  useEffect(() => {
    if (!isEdit || !note) return;

    setTitle(note.title);
    setDescription(note.description);
    setPriority(note.priority);
  }, [note, isEdit]);

  return (
    <form className={styles.input_container} onSubmit={handleSubmit}>
      <input
        className={error ? `${styles.new_input_error}` : `${styles.new_input}`}
        value={title}
        placeholder="Title"
        onChange={onTitleChange}
      />

      <input
        className={error ? `${styles.new_input_error}` : `${styles.new_input}`}
        value={description}
        placeholder="Description"
        onChange={onDescriptionChange}
      />

      {error && <div className={styles.error_message}>{error}</div>}

      <button className={styles.btn} type="submit">
        {isEdit ? "Update note" : "Add note"}
      </button>

      <select value={priority} onChange={onPriorityChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </form>
  );
};

export default NewNoteForm;
