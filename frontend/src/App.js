import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./components/AddPost";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
