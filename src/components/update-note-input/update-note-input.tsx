import { useDispatch } from "react-redux";

import { updateNote } from "../../features/notes/actions";

import styles from "./update-note-input.module.css";
import NewNoteForm from "../new-note-form/new-note-form";
import { Note } from "../../features/notes/state";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../features/store";
import { useMemo } from "react";

const UpdateNoteInput = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const notes = useSelector((state: State) => state.notes.notes);

  const note = useMemo(
    () => notes.find((note) => note.id === +(id as string)),
    [id, notes]
  );

  const onUpdateNoteClick = (note: Partial<Note>) => {
    dispatch(updateNote(note as Note));
  };

  return (
    <>
      <div className={styles.header_container}>
        <h1>Update your note</h1>
      </div>

      <NewNoteForm onSubmit={onUpdateNoteClick} isEdit note={note} />
    </>
  );
};

export default UpdateNoteInput;
