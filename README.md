## Welcome to My Dropbox
***


## Link http://ozodbebu.beget.tech/


## Task
The task of this project is to create a Dropbox clone using the Laravel framework, providing users with a cloud storage 
solution that allows them to upload, manage, and share their files and folders.

## Description
This project aims to replicate the core functionality of Dropbox, which includes features like user registration and 
authentication, file and folder management, file upload and download, sharing files and folders with other users, and 
version history tracking. It addresses the challenge of building a robust file storage and sharing platform while maintaining 
security and performance.

## Installation
To install this project, follow these steps:
1. Clone the repository to your local machine:
   

   git clone <repository_url>
   
2. Navigate to the project directory:
   

   cd dropbox-clone-laravel
   
3. Install Composer dependencies:
   

   composer install
   
4. Create a copy of the .env.example file and name it .env:
   

   cp .env.example .env
   
5. Generate an application key:
   

   php artisan key:generate
   
6. Configure your database connection by updating the .env file with your database credentials.
7. Migrate and seed the database:
   

   php artisan migrate --seed
   
8. Start the Laravel development server:
   

   php artisan serve
   
9. Access the application in your web browser at http://localhost:8000.

## Usage
This Dropbox clone provides the following functionalities:
1. User Registration and Authentication: Users can create accounts and log in securely.

2. File and Folder Management: Users can upload, organize, and manage their files and folders in a hierarchical structure.

3. File Upload and Download: Users can upload files to their storage and download them as needed.

4. Sharing Files and Folders: Users can share files and folders with other registered users, allowing collaborative access.

5. Version History Tracking: The system keeps track of file versions, enabling users to revert to previous versions if needed.

6. User Profile: Users can update their profiles, including profile pictures and personal information.

7. Search Functionality: Users can search for files and folders by name or keywords.

For example, to upload a file using the command line, you can use the following command:

./my_project upload /path/to/file.jpg

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
