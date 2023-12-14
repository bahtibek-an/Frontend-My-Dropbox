import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/user";
import "./App.css";
import Upload from "./components/upload";
import Login from "./components/login";
import Sign from "./components/sign";

function App() {
  return (
          <UserAuthContextProvider>
            <Routes>
              <Route path="/upload" element={<Upload />} />
              <Route path="/" element={<Login />} />
              <Route path="/signUp" element={<Sign />} />
            </Routes>
          </UserAuthContextProvider>
   );
}

export default App;
