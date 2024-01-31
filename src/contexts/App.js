import React from "react";
import Signup from "../components/auth/Signup";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "../components/auth/Profile";
import Login from "../components/auth/Login";
import PrivateRoute from "../components/auth/PrivateRoute";
import ForgotPassword from "../components/auth/ForgotPassword";
import UpdateProfile from "../components/auth/UpdateProfile";
import Dashboard from "../components/google/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
