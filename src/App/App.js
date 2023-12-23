import Test from "../Test";
import Home from "../Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Folders from "../Components/Folders/index";
import Files from "../Components/Files/index";
import DownloadPDF from "../Test";
import { Search } from "../Components/Search";
import Upload from "../Admin/Upload";
function App() {
  return (
    <>
      <BrowserRouter path="/" basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/folders/folder" element={<Folders />} />
          <Route path="/files" element={<Files />} />
          <Route path="/files/file" element={<Files />} />
        </Routes>
      </BrowserRouter>
      {/* <Search /> */}
    </>
  );
}

export default App;
