# Welcome to my Dropbox project

![Alt text](image.png)

# Description

Dropbox is a file hosting service operated by the American company Dropbox, Inc., headquartered in San Francisco, California, that offers cloud storage, file synchronization, personal cloud, and client software.

# Usage

```commandline
// List files in the root folder
const listFiles = async () => {
  try {
    const response = await dropbox.filesListFolder({ path: '' });
    console.log('Files in root folder:', response.entries);
  } catch (error) {
    console.error('Error listing files:', error);
  }
};

// Upload a file to Dropbox
const uploadFile = async (file, destinationPath) => {
  try {
    const response = await dropbox.filesUpload({
      path: `/${destinationPath}/${file.name}`,
      contents: file,
    });
    console.log('File uploaded:', response.name);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Usage
listFiles();

// Replace 'someFile' with the file you want to upload
uploadFile(someFile, 'uploads');

```

# Installation

```commandline
npm install 
``````
```commandline
npm start 
```

```commandline
import { Dropbox } from 'dropbox';
```
```commandline
const dropbox = new Dropbox({
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```
# Team

I have completed this project on my own 