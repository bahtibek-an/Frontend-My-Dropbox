import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { recursiveTraversal, homePwd } from '../../store/actions/recursiveTraversalAction'
import { currentPath, atHome } from '../../store/actions/currentPathAction'
import { downloadFile } from '../../store/actions/downloadAction'
import { removeFile, removeFolder } from '../../store/actions/removeAction'
import FolderView from '../folder/FolderView'
import FileView from '../file/FileView'
import Uploader from '../uploader/Uploader'

window.addEventListener('beforeunload', function (e) {
    e.preventDefault()
    e.returnValue = 'Please use Navbar to Navigate'
})

class Dashboard extends Component {
    state = {
        f1: [],
        files: false,
        folders: false,
        open: false,
        home: false,
        up: false,
        status: false
    }

    componentDidMount() {
        const { atHome } = this.props
        atHome()
        this.loadDashboard()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.path !== this.props.path) {
            if (this.props.path.currentPath.breadcrumb.length) {
                this.setState({ open: true })
            }
        }
        if (prevProps.upload.files !== this.props.upload.files) {
            this.setState({ up: true })
        }
        if (prevProps.remove !== this.props.remove) {
            this.loadDashboard(true)
        }
        if (prevProps.createFolder !== this.props.createFolder) {
            this.loadDashboard(true)
        }
        if ((prevProps.upload.status == true)) {
            if (!this.state.status) {
                this.state({ status: true })
            }
        }
        if ((prevProps.upload.status == true && this.props.upload.status == false)) {
            this.setState({ status: false })
        }
    }

    loadDashboard = (isNew) => {
        if (isNew) {
            this.setState({ f1: [], new: false })
        }
        const { files, folders, homePwd } = this.props
        this.setState({ home: true })
        if (files) {
            this.setState({ files: true })
        }
        if (folders) {
            var fs = Object.keys(folders).map(key => {
                return {
                    name: folders[key].name,
                    id: folders[key].id
                }
            })
            fs.map((f) => {
                this.setState(prevState => ({
                    f1: [...prevState.f1, f]
                }))
            })
            this.setState({ folders: true })
        }
        homePwd()
    }
    openFolder = (e, id) => {
        this.setState({ open: false, home: false })
        const { currentPath, recursiveTraversal } = this.props
        currentPath(id)
        recursiveTraversal(id)
    }
    goToHome = () => {
        this.setState({ home: true, open: false })
    }
    download = (e) => {
        const url = e.target.id
        console.log(e.target)
        const name = e.target.parentElement.id
        this.props.downloadFile(url, name)
    }
    remove = (e) => {
        const name = e.target.parentElement.id
        console.log(name)
        this.props.removeFile(name, 'home')
    }
    removeF = (e) => {
        const name = e.target.parentElement.id
        this.props.removeFolder(name, 'home')
    }
    render() {
        const { files, path, upload } = this.props
        let { f1 } = this.state
        f1 = f1.slice()

        if(this.state.open) {
            const p = path.currentPath.path
            return (
                <Navigate to={{ pathname: '/folder' + p }} />
            )
        }
        if (this.state.home) {
            return (
                <div className="pl-5">
                    {this.state.folders ? (<FolderView folders={f1} openFolder={this.openFolder} remove={this.removeF} source='home' />) : null}
                    {this.state.files ? (<FileView files={files} download={this.download} remove={this.remove} />) : null}
                    {this.state.status ? (<Uploader prog={upload.prog} />) : null}
                </div>
            )
        }
        return (
            <div>Loading Dashboard</div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        downloadFile: (url, name) => dispatch(downloadFile(url, name)),
        removeFile: (fileName, source) => dispatch(removeFile(fileName, source)),
        removeFolder: (folderName, source) => dispatch(removeFolder(folderName, source)),
        recursiveTraversal: id => dispatch(recursiveTraversal(id)),
        currentPath: (id, back) => dispatch(currentPath(id, back)),
        atHome: () => dispatch(atHome()),
        homePwd: () => dispatch(homePwd())
    }
}
const mapStateToProps = (state) => {
    return {
        id: state.firestore.firestore.id,
        files: state.firestore.firestore.files,
        folders: state.firestore.firestore.folders,
        pwd: state.pwd,
        path: state.currentPath,
        upload: state.upload,
        remove: state.remove,
        createFolder: state.createFolder
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)