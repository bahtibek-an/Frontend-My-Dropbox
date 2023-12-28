import { Component } from "react";
import Navbar from "../components/Navbar";
import { getStorage, ref, getDownloadURL, uploadBytes, listAll } from "firebase/storage";


export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			uploadFile: null,
			newFolderName: null,
		};


		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.handleNewFolder = this.handleNewFolder.bind(this);
	}

	getPath() {
		const searchParams = new URLSearchParams(window.location.search);
		let path = searchParams.get('path');
		if (path) {
			return 'Files/' + path + '/';
		} else {
			return 'Files/';
		}
	}

	handleFileChange = (e) => {
		if (e.target.files[0]) {
			this.setState({ uploadFile: e.target.files[0] });
		}
	};

	handleNewFolderNameChange = (e) => {
		if (e.target.value) {
			this.setState({ newFolderName: e.target.value });
		} else {
			this.setState({ newFolderName: null });
		}
	}

	async handleNewFolder() {
		if (this.state.newFolderName) {
			const storage = getStorage();
			const rootRef = ref(storage);
			const path = this.getPath() + this.state.newFolderName + '/.newfolderinit';
			const storageRef = path ? ref(rootRef, path) : rootRef;

			try {
				await uploadBytes(storageRef, new Uint8Array());
			} catch (error) {
				console.error(error);
			}

			this.setState({ newFolderName: null });
			await this.handleLoadFiles();
		}
	}

	async handleUploadFile() {
		if (this.state.uploadFile) {
			const storage = getStorage();
			const rootRef = ref(storage);
			const path = this.getPath() + this.state.uploadFile.name;
			const storageRef = path ? ref(rootRef, path) : rootRef;

			try {
				await uploadBytes(storageRef, this.state.uploadFile);
			} catch (error) {
				console.error(error);
			}

			await this.handleLoadFiles();
		}
	}

	async handleLoadFiles() {
		const storage = getStorage();
		const storageRef = ref(storage, this.getPath());

		try {
			const items = await listAll(storageRef);

			const files = [];

			for (const item of items.items) {
				const downloadURL = await getDownloadURL(item);
				files.push({
					name: item.name,
					downloadURL,
					isDirectory: false,
				});
			}

			for (const item of items.prefixes) {
				files.push({
					name: item.name,
					isDirectory: true,
				});
			}

			this.setState({ files });
		} catch (error) {
			console.error("Error listing files: ", error);
		}
	}


	componentDidMount() {
		this.handleLoadFiles();
	}

	render() {
		return (
			<>
				<Navbar />
				<div className="container">
					<h2>Files in Firebase Storage:</h2>
					<div className="list-group">
						{this.state.files.length > 0 ? this.state.files.map((file, index) => (
							<a key={index} href={file.isDirectory ? '?path=/' + file.name : file.downloadURL} target={ file.isDirectory ? '_self' : '_blank' } rel={ file.isDirectory ? '' : "noopener noreferrer" } className={`list-group-item list-group-item-action d-flex`} style={{ gap: 16 }}>
								{ file.isDirectory ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
</svg> }
								<span>{file.name}</span>
							</a>
						)) : <p key={0} className="list-group-item list-group-item-action">Nothing found here</p>}

					</div>
				</div>

				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">File Upload</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<input type="file" className="form-control" onChange={this.handleFileChange} />
							</div>
							<div className="modal-footer">
								<div className="d-flex" style={{ 'gap': 16 }}>
									<button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={this.handleUploadFile} disabled={this.state.uploadFile == null}>Upload</button>
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="newFolder" tabIndex="-1" aria-labelledby="newFolderLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="newFolderLabel">Create folder</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<input type="text" placeholder="New folder name" className="form-control" onChange={this.handleNewFolderNameChange} value={ this.state.newFolderName || '' }/>
							</div>
							<div className="modal-footer">
								<div className="d-flex" style={{ 'gap': 16 }}>
									<button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={this.handleNewFolder} disabled={this.state.newFolderName == null}>Create folder</button>
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
