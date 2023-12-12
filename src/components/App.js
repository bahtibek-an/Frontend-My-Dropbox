import './style/style.css';
import Dashboard from "./Dashboard";
import Private from "./private/Private";
import NotFound from './private/NotFound';
import Login from "./SignUpAndLogIn/Login";
import { PulseLoader } from "react-spinners";
import Signup from "./SignUpAndLogIn/Signup";
import React, { useState, useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import ForgotPass from "./SignUpAndLogIn/ResetPassword";
import UpdateProfile from "./SignUpAndLogIn/UpdateProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  return (
    <Router>
      { loading ? (<PulseLoader className="loading d-flex justify-content-center align-items-center position-absolute" size={40} color={"#198754"} loading={loading} />) :(
        <AuthProvider>
          <Switch>
            <Private exact path="/" component={Dashboard} />
            <Private exact path="/folder/:folderId" component={Dashboard} />
            <Private path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/reset" component={ForgotPass} />
            <Route path="/:pageName" component={NotFound} />
          </Switch>
        </AuthProvider>
      )}
    </Router>
  );
};

export default App;