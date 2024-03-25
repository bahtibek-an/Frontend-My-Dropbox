import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/AuthPages/Login/Login";
import Register from "./pages/AuthPages/Register/Register";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";
import EditProfile from "./components/DashboardComponents/EditProfile/EditProfile";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EditUser from "./components/DashboardComponents/EditUser/EditUser";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/dashboard/edit/user" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;
