import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import FolderView from './FolderView'
import FileView from '../file/FileView'
import Breadcrumb from '../infobar/Breadcrumb'
import Navbar from '../Navbar/Navbar'
import Uploader from '../uploader/Uploader'
import { removeFile, removeFolder } from '../../store/actions/removeAction'
import { recursiveTraversal } from '../../store/actions/recursiveTraversalAction'
import { currentPath } from '../../store/actions/currentPathAction'
import { downloadFile } from '../../store/actions/downloadAction'

class NonEmptyFolder extends Component {
    state = {
        open: false,
        others: false,
        up: false,
        new: false,
        rem: false,
        status: false
    }
    componentDidMount() {
        this.setState({ open: true })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.path !== this.props.path) {
            this.setState({ open: true })
        }
        if (prevProps.upload !== this.props.upload) {
            this.setState({ up: true })
        }
        if (prevProps.remove !== this.props.remove) {
            this.setState({ rem: true })
        }
        if (prevProps.createFolder !== this.props.createFolder) {
            this.setState({ new: true })
        }
        if ((prevProps.upload.status == true)) {
            console.log('true')
            if (!this.state.status) {
                this.setState({ status : true })
            }
        }
        if ((prevProps.upload.status == true && this.props.upload.status == false)) {
            console.log('false')
            this.setState({ status: false })
        }
    }
    loadFolder = () => {
        const { pwd } = this.props
        const { f, r } = pwd.pwd
        var folderArray = Object.keys(r.folders).map(key => {
            return r.folders[key]
        })
        return [f, folderArray, r.files]
    }
    openFolder = (e, id, back) => {
        this.setState({ open: false, others: true })
        const { currentPath, recursiveTraversal } = this.props
        currentPath(id, back)
        recursiveTraversal(id)
    }
    download = (e) => {
        const url = e.target.id
        const name = e.target.parentElement.id
        this.props.download(url, name)
    }
    remove = (e) => {
        const name = e.target.parentElement.id
        this.props.removeFile(name, 'inner')
    }
    removeF = (e) => {
        const name = e.target.parentElement.id
        this.props.removeFolder(name, 'inner')
    }
    render() {
        let { user, upload } = this.props
        let u = user ? user.username : null
        if (this.state.open) {
            const [f, r, files] = this.loadFolder()
            return (
                <div className="d-flex flex-column">
                    <Navbar name={u} />
                    <Breadcrumb openFolder={this.openFolder} />
                    <div className="d-flex flex-row">
                        <SideBar source={'inner'} />
                        <div className="pl-5">
                            <FolderView folders={r} openFolder={this.openFolder} remove={this.removeF} source='inner' />
                            <FileView files={files} download={this.download} remove={this.remove} />
                            {this.state.status ? (<Uploader prog={upload.prog} />) : null }
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.others) {
            const { path } = this.props
            const p = path.currentPath.path
            return (
                <Navigate to={{ pathname: '/folder' + p }} />
            )
        }
        return (
            <div>Loading</div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        downloadFile: (url, name) => dispatch(downloadFile(url, name)),
        recursiveTraversal: id => dispatch(recursiveTraversal(id)),
        currentPath: (id, back) => dispatch(currentPath(id, back)),
        removeFile: (fileName, source) => dispatch(removeFile(fileName, source)),
        removeFolder: (folderName, source) => dispatch(removeFolder(folderName, source))
    }
}
const mapStateToProps = (state) => {
    return {
        pwd: state.pwd,
        path: state.currentPath,
        upload: state.upload,
        remove: state.remove,
        createFolder: state.createFolder,
        user: state.firestore.firestore,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NonEmptyFolder)