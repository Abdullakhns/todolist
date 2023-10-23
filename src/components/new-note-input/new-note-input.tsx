import { useDispatch } from "react-redux";

import { addNote } from "../../features/notes/actions";

import NewNoteForm from "../new-note-form/new-note-form";
import styles from "./new-note-input.module.css";
import { useState } from "react";

const NewNoteInput = () => {
  const dispatch = useDispatch();

  const onAddNoteClick = (note: {
    title: string;
    description: string;
    priority: number;
  }) => {
    dispatch(addNote(note));
  };

  return (
    <>
      <div className={styles.input_content}>
        <h2>Add New Note</h2>
      </div>

      <NewNoteForm onSubmit={onAddNoteClick} />
    </>
  );
};

export default NewNoteInput;
