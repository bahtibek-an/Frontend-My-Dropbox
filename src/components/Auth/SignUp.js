import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { firebase } from '../../config/firebase'
import { createAccount } from '../../store/actions/createAccountAction'

class SignUp extends Component {

    state = {
      name: '',
      email: '',
      password: '',
      uid: '',
      isSignedUp: false,
      spinner: false,
      login: false
    }
  
    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
  
    handleSubmit = e => {
      e.preventDefault()
      const { createAccount } = this.props
      this.setState({ spinner: true })
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        const uid = data.user.uid
        this.setState({ uid: uid })
        createAccount(this.state)
        this.setState({ isSignedUp: true, spinner: false })
      })
  
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
  
    }
  
    render() {
  
      if (this.state.isSignedUp) {
  
        const { uid } = this.state
        return (
          <Navigate
            to={{
              pathname: '/dropbox',
              state: {
                uid
              }
            }}
          />
        )
      }
  
      if(this.state.login){
        return (
            <Navigate to={{
                pathname: "/signin"
            }} />
        )
      }
  
      return (
        <div className="jumbotron d-flex align-items-center min-vh-100 bg-white p-0">
          <div className="container">
  
            <form className="mx-auto p-3 mt-5" style={{ maxWidth: "800", border: "2px solid #1DA1F2", borderRadius: "20px" }} onSubmit={this.handleSubmit}>
              <div className="pb-2">
                <span><h2>Create your account</h2></span>
              </div>
              <div className="form-group mt-3 form-font">
                <div className="bg-light rounded mt-3">
                  <div className="ml-1">
                    <span className="font-weight-light">Name</span>
                  </div>
                  <div>
                    <input id="name" type="text" className="form-control bg-light border-0 pl-1 pr-1 pb-2 pt-1 h-75 outline" onChange={this.handleChange} />
                  </div>
                  <hr className="mt-0 border-0 boundary" />
                </div>
  
                <div className="bg-light rounded mt-3">
                  <div className="ml-1">
                    <span className="font-weight-light">Email</span>
                  </div>
                  <div>
                    <input id="email" type="text" className="form-control bg-light border-0 pl-1 pr-1 pb-2 pt-1 h-75 outline" onChange={this.handleChange} />
                  </div>
                  <hr className="mt-0 border-0 boundary" />
                </div>
  
                <div className="bg-light rounded mt-3">
                  <div className="ml-1">
                    <span className="font-weight-light">Username</span>
                  </div>
                  <div>
                    <input id="username" type="text" className="form-control bg-light border-0 pl-1 pr-1 pb-2 pt-1 h-75 outline" onChange={this.handleChange} />
                  </div>
                  <hr className="mt-0 border-0 boundary" />
                </div>
  
                <div className="bg-light rounded mt-3">
                  <div className="ml-1">
                    <span className="font-weight-light">Password</span>
                  </div>
                  <div>
                    <input id="password" type="password" className="form-control bg-light border-0 pl-1 pr-1 pb-2 pt-1 h-75 outline" onChange={this.handleChange} />
                  </div>
                  <hr className="mt-0 border-0 boundary" />
                </div>
  
              </div>
              <button className="btn btn-lg btn-primary border-0" style={{ backgroundColor: "#1DA1F2", borderRadius: "75px" }}>Sign Up</button>
            </form>
            <p className="mt-3">
              Already have an account?
            </p>
            <button className="btn btn-lg btn-primary border-0 " style={{ backgroundColor: "#1DA1F2", borderRadius: "75px" }} onClick={event => this.setState({ login: true })}>Sign In</button>
          </div>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createAccount: (uid) => dispatch(createAccount(uid))
    }
  }
  
  export default connect(null, mapDispatchToProps)(SignUp)