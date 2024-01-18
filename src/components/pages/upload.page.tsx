import React, { useState, useEffect } from 'react';
import firebase from '../../dataConfig/firabesa.config';
import { useSelector } from 'react-redux';
import { RootState } from '../../Logic/store.main'
// import styles from './FileUpload.module.css'

type FileData = {
  id: string;
  url: string;
  file_name: string;
  name: string;
  file_type: string;
  file_size: number;
  userId: string;
  createdAt: firebase.firestore.Timestamp;
};

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const [fileOriginalName, setFileOriginalName] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.auth);
  const currentUserFilesRef = firebase.firestore().collection('files').where('userId', '==', user?.id);
  const [fileList, setFileList] = useState<FileData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setFileName(new Date().toISOString() + '_' + event.target.files[0].name);
      setFileOriginalName(event.target.files[0].name);
      setError('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      const storageRef = firebase.storage().ref();
      const fileNameWithTimestamp = new Date().toISOString() + '_' + file.name;
      const fileRef = storageRef.child(`files/${user?.id}/${fileNameWithTimestamp}`);
      const uploadTask = fileRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const dbRef = firebase.firestore().collection('files').doc();
            dbRef.set({
              url,
              file_name: fileOriginalName,
              name: fileNameWithTimestamp,
              userId: user?.id,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              file_size: file.size,
              file_type: getFileType(file.type),
            });
            fetchFiles();
            setProgress(100);
            setTimeout(() => {
              setProgress(0);
            }, 2000)
          });
        }
      );
    } else {
      setError('Please select a file to upload');
    }
  };
  const getFileType = (fileType: string) => {
    if (fileType.includes('image')) {
      return 'image';
    } else if (fileType.includes('audio') || fileType.includes('midi') || fileType.includes('mpeg')) {
      return 'music';
    } else if (fileType.includes('video')) {
      return 'video';
    } else {
      return 'file';
    }
  };


  const fetchFiles = async () => {
    try {
      const querySnapshot = await currentUserFilesRef.get();
      const files: FileData[] = [];
      querySnapshot.forEach((doc) => {
        files.push({ id: doc.id, ...doc.data() } as FileData);
      });
      setFileList(files);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);


  const handleDelete = async (fileId: string) => {
    try {
      const fileDocRef = firebase.firestore().doc(`files/${fileId}`);
      const fileDoc = await fileDocRef.get();
      const { url } = fileDoc.data() as FileData;
      // Delete file from storage
      const storageRef = firebase.storage().refFromURL(url);
      await storageRef.delete();

      // Delete file data from Firestore
      await fileDocRef.delete();

      // Update file list
      const newFileList = fileList.filter((file) => file.id !== fileId);
      setFileList(newFileList);




    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="file-upload p-4 border rounded">
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="input-file d-flex">
              <input type="file" name="file" onChange={handleFileChange} className="d-none" />
              <span className="input-file-btn btn btn-primary mr-2">Choose File</span>
              <button type="submit" className="btn btn-success">Upload</button>
            </label>
          </form>

          {error && <p className="error">{error}</p>}
          {progress > 0 && progress < 100 && <p className="mb-2">{`${progress}% uploaded`}</p>}
          {progress === 100 && <p className="mb-2 text-success">File uploaded successfully!</p>}

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Content</th>
                <th>Type</th>
                <th>Size</th>
                <th>View</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file) => (
                <tr key={file.id}>
                  <td>{file.file_name}</td>
                  <td>
                    {file.file_type === 'image' && (
                      <img width={100} height={50} src={file.url} alt={file.file_name} className="img-fluid" />
                    )}
                    {file.file_type === 'music' && (
                      <audio controls className="w-100">
                        <source src={file.url} type="audio/mpeg" />
                      </audio>
                    )}
                    {file.file_type === 'video' && (
                      <video width={80} height={80} controls className="img-fluid">
                        <source src={file.url} type="video/mp4" />
                      </video>
                    )}
                    {file.file_type === 'file' && (
                      <p>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.file_name}
                        </a>
                      </p>
                    )}
                  </td>
                  <td>{file.file_type}</td>
                  <td>{(file.file_size / 1024).toFixed(2)} KB</td>
                  <td><a href={file.url} target="_blank" className="btn btn-info btn-sm">Show</a></td>
                  <td>
                    <button onClick={() => handleDelete(file.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );


}
export default FileUpload;
