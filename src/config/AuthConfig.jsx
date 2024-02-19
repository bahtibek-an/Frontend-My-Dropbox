import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: true,
    };
  }

  signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  logout = () => {
    return auth.signOut();
  };

  resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  updateEmail = (email) => {
    return this.state.currentUser.updateEmail(email);
  };

  updatePassword = (password) => {
    return this.state.currentUser.updatePassword(password);
  };

  // New method to update display name (username)
  updateProfile = (displayName) => {
    return this.state.currentUser.updateProfile({
      displayName: displayName,
    });
  };

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { currentUser, loading } = this.state;

    const updateProfile = (updates) => {
      if (currentUser) {
        return currentUser.updateProfile(updates);
      }
      return Promise.reject("No user logged in");
    };
  
    const updateEmail = (email) => {
      if (currentUser) {
        return currentUser.updateEmail(email);
      }
      return Promise.reject("No user logged in");
    };
  
    const updatePassword = (password) => {
      if (currentUser) {
        return currentUser.updatePassword(password);
      }
      return Promise.reject("No user logged in");
    };

    const value = {
      currentUser,
      login: this.login,
      signup: this.signup,
      logout: this.logout,
      resetPassword: this.resetPassword,
      updateEmail: this.updateEmail,
      updatePassword: this.updatePassword,
      updateProfile: this.updateProfile, 
    };

    return (
      <AuthContext.Provider value={value}>
        {!loading && this.props.children}
      </AuthContext.Provider>
    );
  }
}

export function useAuth() {
  return useContext(AuthContext);
}
