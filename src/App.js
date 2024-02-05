import React from "react"
import Signup from "./components/SignUp/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./components/Profile/Profile"
import Login from "./components/Login/Login"
import PrivateRoute from "./components/PrivateRouter/PrivateRoute"
import Dashboard from "./components/Dashboard/Dashboard"


function App() {
  return (
    <Router>
      <AuthProvider>
      
        <Switch>
          
          {/* Drive */}
          
          <PrivateRoute exact path="/" component={Dashboard}  />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />

          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
