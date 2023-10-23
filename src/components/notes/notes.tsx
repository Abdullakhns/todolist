import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { State } from "../../features/store";
import { changeIsCompleted, removeNote } from "../../features/notes/actions";

import Header from "../header/header";
import styles from "./notes.module.css";
import { useQuery } from "../../hooks/use-query";

const Notes = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state: State) => state.notes.notes);

  const query = useQuery();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isSorted, setIsSorted] = useState(false);

  const _notes = useMemo(() => {
    const _notes = notes.filter((note) => {
      let initialFilter = true;

      if (search) {
        initialFilter =
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.description.toLowerCase().includes(search.toLowerCase());
      }

      if (statusFilter !== "all") {
        initialFilter =
          statusFilter === "completed" ? note.completed : !note.completed;
      }

      return initialFilter;
    });

    if (isSorted) {
      _notes.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    }

    return _notes;
  }, [notes, search, statusFilter, isSorted]);

  const onRemoveNote = (id: number) => {
    dispatch(removeNote(id));
  };

  const isComplete = (id: number, completed: boolean) => {
    dispatch(changeIsCompleted({ id, completed: completed }));
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onBlur = (filter: string, sort: boolean = false) => {
    navigate(`/?search=${search}&filter=${filter}&sort=${sort}`);
  };

  const onButtonClick = () => {
    setIsSorted(!isSorted);
    onBlur(statusFilter, !isSorted);
  };

  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    onBlur(e.target.value);
  };

  useEffect(() => {
    const search = query.get("search");
    const filter = query.get("filter");
    const sort = query.get("sort");
    if (search) {
      setSearch(search);
    }
    if (filter) {
      setStatusFilter(filter);
    }
    if (sort) {
      setIsSorted(sort === "true");
    }
  }, [query]);

  return (
    <>
      <Header />

      <div className={styles.link_container}>
        <Link to="new" className={styles.btn_add}>
          Add note
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.search_container}>
          <label className={styles.search_label} htmlFor="search">
            Search:
          </label>

          <div className={styles.search_input_container}>
            <input
              className={styles.search_input}
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={search}
              onChange={onSearchChange}
              onBlur={() => onBlur(statusFilter)}
            />

            <i className={styles.search_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-1 h-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </i>
          </div>
        </div>

        <div className={styles.filter_container}>
          <label className={styles.filter_label} htmlFor="filter">
            Filter:
          </label>

          <div className={styles.filter_input_container}>
            <select
              className={styles.filter_select}
              value={statusFilter}
              onChange={onFilterChange}
            >
              <option value="all">all</option>
              <option value="completed">completed</option>
              <option value="uncompleted">uncompleted</option>
            </select>

            <i className={styles.filter_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-1 h-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </i>
          </div>
        </div>

        <button className={styles.btn_sort} onClick={onButtonClick}>
          Sort
        </button>
      </div>

      <ul className={styles.notes}>
        {_notes.map((note) => (
          <li
            className={`${note.completed ? styles.note_checked : styles.note}`}
            key={note.id}
          >
            <div className={styles.note_content}>
              <div>
                <input
                  onChange={(e) => isComplete(note.id, e.target.checked)}
                  className={styles.check_input}
                  type="checkbox"
                  name="note"
                  id="note"
                  checked={note.completed}
                />
              </div>

              <div className={styles.label_container}>
                <label htmlFor="note">
                  <b>Title: </b> {note.title}
                </label>
                <label htmlFor="note">
                  <b>Description:</b> {note.description}
                </label>
                <label htmlFor="note">
                  <b>Priority:</b> {note.priority}
                </label>
              </div>
            </div>

            <div className={styles.buttons}>
              <Link to={`/update/${note.id}`} className={styles.btn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>

              <button
                onClick={() => onRemoveNote(note.id)}
                className={styles.btn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notes;
