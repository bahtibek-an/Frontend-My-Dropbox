import React from "react";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./config/AuthConfig.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./config/PrivateRoute.jsx";
import EditProfile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute
              exact
              path="/folder/:folderId"
              component={Dashboard}
            />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
