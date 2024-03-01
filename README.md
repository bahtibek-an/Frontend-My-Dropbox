# Dropbox Clone 
## Link http://sx2803bu.beget.tech/

# Hakim Xudoyberdiyev

## Task
This project is a Dropbox clone built using the Laravel framework for the backend and Vue.js for the frontend. The application provides user authentication, folder creation, file uploads, sharing, viewing, downloading, and deletion features. It also includes a "trash" section where deleted items are stored, allowing users to either restore or permanently delete them. Additionally, the project supports the ability to choose multiple files or folders for download, which are then packaged into a zip file.
Create a Dropbox clone that offers the following features:
- User Authentication
- Folder Creation and Uploading
- Support for Various File Types
- File and Folder Sharing
- Viewing, Downloading, and Deleting Files and Folders
- Trash Section for Deleted Items
- Restoration and Permanent Deletion from the Trash
- Selection of Multiple Files or Folders for Download
- Downloaded Items Packaged in Zip Format

## Description
This Dropbox clone is a web-based file storage and sharing application that replicates the core functionalities of Dropbox. Users can securely authenticate, create folders, and upload various file types. The application supports sharing files and folders, as well as providing the ability to view, download, and delete them.
Deleted items are moved to the "trash" section, where users can either restore them to their original location or permanently delete them. The project also includes the functionality to choose multiple files or folders for download, and during the download process, the selected items are bundled into a zip file for easy retrieval.

## Installation
Follow these steps to set up the Dropbox clone project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dropbox-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dropbox-clone
   ```

3. Install PHP dependencies:
   ```bash
   composer install
   ```

4. Copy the `.env.example` file to `.env` and configure the database connection and other necessary settings:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```

7. Install npm dependencies:
   ```bash
   npm install
   ```

8. Compile assets:
   ```bash
   npm run dev
   ```


## Usage
Start the development server:
   ```bash
   php artisan serve
   ```

Visit `http://localhost:8000` in your web browser. And you can do: 

1. **User Authentication:**
   - Register a new account or log in with existing credentials.

2. **Folder Creation and Uploading:**
   - Create new folders or upload files by navigating to the respective sections.

3. **File and Folder Actions:**
   - Share, view, download, or delete files and folders.

4. **Trash Section:**
   - Deleted items can be found in the trash section, where they can be restored or permanently deleted.

5. **Multiple Selection for Download:**
   - Choose multiple files or folders for download, and they will be packaged into a zip file.
