import { BrowserRouter, Route, Routes } from "react-router-dom";

import Notes from "./components/notes/notes";
import NewNoteInput from "./components/new-note-input/new-note-input";
import UpdateNoteInput from "./components/update-note-input/update-note-input";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/new" element={<NewNoteInput />} />
          <Route path="/update/:id" element={<UpdateNoteInput />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
