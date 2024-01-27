import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

import { firebase } from '../../config/firebase'

class SignOut extends Component {
    state = {
        signedOut: false
    }


    handleClick = () => {
        firebase.auth().signOut().then(data => {
            this.setState({ signedOut: true })
        }).catch(function (error) {
            console.log('error sign out')
        });
    }

    render() {
        if(this.state.signedOut) {
            return (
                <Navigate
                to={{
                    pathname: '/signin',
                }}
                />
            )
        }

        return (
            <button className="btn btn-primary border-0" onClick={this.handleClick} style={{ backgroundColor: "#1DA1F2", borderRadius: "75px" }}>Sign Out</button>
        )
    }
}

export default SignOut
