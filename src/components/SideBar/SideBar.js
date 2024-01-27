import React, { Component } from 'react';
import { connect } from 'react-redux'
import { uploadFile } from '../../store/actions/uploadAction'
import { createFolder } from '../../store/actions/createFolderAction'

class SideBar extends Component {
    state = {
        show: false
    }

    handleCreateFolder = (e) => {
        e.preventDefault()
        const { createFolder, source } = this.props
        const name = document.getElementById("folderName").value
        document.getElementById("folderName").value = ""
        if (name != '') {
            createFolder(name, source)
            document.getElementById("modalCloseButton").click()
        } else {
            console.log ('Enter folder name to create a folder')
        }
    }

    render() {
        const { uploadFile, createFolder, firestore, source } = this.props
        const { uid } = firestore
        const handleUploadFile = (e) => {
            e.preventDefault()
            const f = document.getElementById('upload-file')
            uploadFile(f, source)
        }

        return (
            <div className="sidebar-sticky pt-3 d-flex flex-column">
                <div className="dropdown p-3">
                    {
                        this.props.createFolder.request ? (
                            <button type="button" className="btn btn-primary">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        ) : (
                            <button className="btn btn-light dropdown-toggle" style={{ backgroundColor: "#e2e6e9" }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-aria-haspopup="true" aria-expanded="false">
                                <svg width="7em" height="4em" viewbox="0 0 16 16" className="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5a.5.5 0 0 1 .5 8zM5 4.854a.5.5 0 0 0 .707 0L8 2.56l2.293 2.293A.5.5 0 1 0 11 4.146L8.354 1.5a.5.5 0 0 0-.708 0L5 4.146a.5.5 0 0 0 0 .708z" />
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 2z" />
                                </svg>
                            </button>
                        )
                    }
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button type="button" className="btn btn-outline-primary dropdown-item" onClick={handleUploadFile}>File Upload</button>
                        <button type="button" className="btn btn-outline-primary dropdown-item" data-toggle="modal" data-target="#exampleModal">Create Folder</button>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create Folder</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form className="form-inline">
                                    <label for="folderName">Folder Name</label>
                                    <input id="folderName" className="form-control ml-4" />
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button id="modalCloseButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                    this.props.createFolder.request ? (
                                        <button type="button" class="btn btn-primary">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        </button>
                                    ) : (
                                        <button type="button" class="btn btn-primary" onClick={this.handleCreateFolder}>Create</button>
                                    )
                                }   
                            </div>
                        </div>
                    </div>  
                </div>
                <label className="pl-3 pt-3" htmlFor="upload-photo">Browse...</label>
                <input className="ml-3" style={{ backgroundColor: "#e2e6e9", width: "15em" }} type="file" name="photo" id="upload-file" />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (file, source) => dispatch(uploadFile(file, source)),
        createFolder: (f, uid) => dispatch(createFolder(f, uid))
    }
}
const mapStateToProps = (state) => {
    return {
        firestore: state.firestore.firestore,
        createFolder: state.createFolder
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)