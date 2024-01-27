import React, { Component } from 'react';
import SignOut from '../Auth/SignOut'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">{this.props.name}</a>
                    <span align="center" className="font-weight-bold">
                        To view a file, open in new tab <br /> Use Navbar to navigate
                    </span>
                    <SignOut />
                </nav>
            </div>
        )
    }
}

export default Navbar