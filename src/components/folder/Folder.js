import React, { Component } from 'react';
import { connect } from 'react-redux'

class Folder extends Component {
    state = {
        f: this.props.folder,
        source: this.props.source,
    }
    handleOpenFolder = (e) => {
        e.preventDefault()
        this.props.openFolder(e, this.state.id, false)
    }
    render() {
        return (
            <div id={this.props.folder.name} className="d-flex flex-column p-5">
                <svg onClick={this.handleOpenFolder} width="7em" height="7em" viewBox="0 0 16 16" className="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
                <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                <path fillRule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
                </svg>
                <span className="text-center">{this.props.folder.name}</span>
                {this.props.rem.request ? (
                    <button type="button" className="btn btn-outline-primary">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : <button type="button " className="btn btn-outline-primary" onClick={e => this.props.remove(e)}>Remove</button>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        rem: state.remove
    }
}
export default connect(mapStateToProps)(Folder)