import { connect } from 'react-redux'
import React, { Component } from 'react'
import Navbar from './Navbar/Navbar'
import SideBar from './SideBar/SideBar'
import Dashboard from './Dashboard/Dashboard'
import { firestore } from '../store/actions/firestoreAction'

class Dropbox extends Component {

    state = {
      uid: this.props.location.state.uid,
      isUserLoaded: false
    }
  
    componentDidMount() {
      const { firestore } = this.props
      firestore(this.state.uid)
        .then(() => {
          this.setState({ isUserLoaded: true })
        })
        .catch(e => console.log(e))
    }
  
    render() {
      let { user } = this.props
      let u = user ? user.username : null
      return (
        <div className="container-fluid p-1 d-flex flex-column">
          <Navbar name={u} />
          <div className="d-flex flex-row">
            {this.state.isUserLoaded ? (<SideBar source={'home'} />) : null}
            {this.state.isUserLoaded ? (<Dashboard />) : null}
          </div>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      firestore: (uid) => dispatch(firestore(uid))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.firestore.firestore,
      path: state.currentPath
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dropbox)