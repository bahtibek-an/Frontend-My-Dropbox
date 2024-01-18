
# NextJS Dropbox Clone

<img src="https://github.com/Shaban-Eissa/NextJS-Dropbox-Clone/assets/49924090/effe3537-dec4-4546-850e-ebc7d7d1912d" width="400" height="80" />


A clone of Dropbox built with Next.js, React, and other technologies.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)


## Features

- **Modern Stack:** Built with Next.js, React, Firebase, Zustand and other modern web technologies.
- **Responsive Design:** Ensures a seamless experience across various devices.
- **Upload Functionality:** Users can upload files with any file type.
- **User Authentication:** Secure user authentication for personalized experiences.
- **CRUD Operations:** Users can edit filename, and can delete any file.
- **Download Functionality:** Allows users to download files.
- **Sort Files:** Allow users to sort files by date of uploaded files.
- **Toast Notifications:** Display notifications for uploading, renaming, deleting files indicating the file state in app for better Developer Experience(DX).

## Demo

<img src="https://github.com/Shaban-Eissa/NextJS-Dropbox-Clone/assets/49924090/87ebfe1a-148b-49f7-8527-d7b88170e1ac" width="900" height="400" />

Check out the live demo https://next-js-dropbox-clone.vercel.app

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shaban-Eissa/NextJS-Dropbox-Clone.git
   ```

2. Navigate to the project directory:
    
    ```bash
    cd NextJS-Dropbox-Clone
    ```
    
3. Install dependencies:
    
    ```bash
    npm install
    ```
4. Create a new Project in Clerk https://clerk.com
   
5. Create .env file:
   ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
    CLERK_SECRET_KEY=your_clerk_secret_key
   ```
   replace ```you_clerk_public_key```, ```your_clerk_secret_key``` with your clerk credentials.

6. Replace configs in firebase.ts with your configs:
   ```bash
   const firebaseConfig = {
    apiKey: your_api_key,
    authDomain: your_auth_domain,
    projectId: your_project_id,
    storageBucket: your_storage_bucket,
    messagingSenderId: your_messaging_sender_id,
    appId: your_app_id,
    };
   ```

## Usage

1. Start the development server:
    
    ```bash
    npm run dev
    ```
    
2. Open your browser and visit [http://localhost:3000](http://localhost:3000).
    

## Technologies

This project utilizes a robust stack of modern technologies for efficient development and optimal user experience:

- Next
- React
- Clerk Auth
- Zustand
- Firebase
- Typescript
- TailwindCSS
- Next-Themes
- React-Hot-Toast

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature/bugfix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

