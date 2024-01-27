import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

class Breadcrumb extends Component {
    state = {
        home: false
    }
    createLi = (n, b) => {
        var lis = []
        for (let i = 0; i < n; i++) {
            lis[i] = React.createElement('li', { className: 'breadcrumb-item', id: b[i].id, onClick: this.handleClick, style:{ cursor: "pointer", fontSize: "2em" } }, b[i].name)
        }
        return lis
    }
    handleClick = (e) => {
        e.preventDefault()
        const id = e.target.id
        this.props.openFolder(e, id, true)
    }
    goToHome = (e) => {
        e.preventDefault()
        this.setState({ home: true })
    }
    render() {
        const { path } = this.props
        const breadcrumb = path.currentPath.breadcrumb
        const lis = this.createLi(breadcrumb.length, breadcrumb)
        if (this.state.home) {
            return (
                <Navigate to={{ pathname: '/drive', state: { uid: this.props.id } }} />
            )
        }
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" onClick={this.goToHome} style={{ cursor: "pointer", fontSize: "2em" }}>Home</li>
                    {lis}
                </ol>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        path: state.currentPath,
        id: state.firestore.firestore.name,
    }
}
export default connect(mapStateToProps)(Breadcrumb)