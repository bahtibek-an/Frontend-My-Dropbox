import React, { Component } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { createFolder } from '../../store/actions/folderActions'; // Import the action to create folders
import { Redirect } from 'react-router-dom';
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';

class CreateFolder extends Component {
  state = {
    folderName: '',
    isUploading: false,
    uploadProgress: 0,
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      uploadProgress: 0,
    });
  };

  handleProgress = progress => {
    this.setState({
      uploadProgress: progress,
    });
  };

  handleUploadError = error => {
    this.setState({
      isUploading: false,
    });
    console.error(error);
  };

  handleUploadSuccess = async (uploadedFolderName) => {
    const { folderName } = this.state; // You can access folderName from the state
    const storageRef = firebase.storage().ref(`folders/${uploadedFolderName}`);
    // Implement the folder creation logic here (e.g., store folder data in your database)
    // This example only handles the file upload part
    this.setState(oldState => ({
      uploadProgress: 100,
      isUploading: false,
    }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch an action to create the folder
    this.props.createFolder(this.state);

    // Redirect to the desired page after creating the folder (e.g., 'files' page)
    this.props.history.push('files');
  };

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Folder</h5>
          <div className="input-field">
            <input type="text" id='folderName' onChange={this.handleChange} />
            <label htmlFor="folderName">Folder Name</label>
          </div>
          <FileUploader
            storageRef={firebase.storage().ref("folders")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            randomizeFilename={true}
          />
          <div className="input-field">
            <button className="waves-effect waves-light btn">
              <i className="material-icons right">create_new_folder</i>
              Create Folder
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createFolder: (folder) => dispatch(createFolder(folder)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolder);
