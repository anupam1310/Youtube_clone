# YouTube Clone

This project is a full-stack YouTube clone created using the MERN stack (MongoDB, Express, React, and Node.js). It allows users to view, upload, and interact with videos.

GitHub Repository: https://github.com/anupam1310/Youtube_clone.git

---

## Features

- **Home Page**: Displays a header, a toggleable sidebar, filter buttons, and a grid of video thumbnails.
- **User Authentication**: Users can register and log in using their username, email, and password. Authentication is handled using JSON Web Tokens (JWT).
- **Search and Filter**: A search bar in the header allows filtering videos by title. Filter buttons on the homepage allow filtering by category.
- **Video Player Page**:
  - Displays the selected video with a video player, title, description, and channel name.
  - Includes like and dislike buttons.
  - A comment section where users can add, edit, and delete their comments.
- **Channel Page**:
  - Users can create their own channel after signing in.
  - Displays a list of videos belonging to that channel.
  - Allows users to edit or delete their videos.
- **Responsive Design**: The application is designed to be fully responsive across different devices.

---

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing in the application.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend

- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JSON Web Token (JWT)**: For user authentication.
- **bcrypt**: A library for hashing passwords.
- **CORS**: A package for enabling Cross-Origin Resource Sharing.

---

## Project Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database (either local or on a cloud service like MongoDB Atlas).

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/youtube_clone.git
    ```
2.  **Backend Setup**
    - Navigate to the `Youtube_server` directory.
      ```sh
      cd Youtube_server
      ```
    - Install NPM packages.
      ```sh
      npm install
      ```
    - Create a `.env` file and add your MongoDB connection string and a secret key for JWT:
      ```
      MONGO_URI="your_mongodb_connection_string"
      JWT_SECRET="your_jwt_secret"
      ```
    - Start the backend server.
      ```sh
      npm start
      ```
3.  **Frontend Setup**
    - Navigate to the `Youtube_frontend` directory.
      ```sh
      cd ../Youtube_frontend
      ```
    - Install NPM packages.
      ```sh
      npm install
      ```
    - Start the frontend development server.
      ```sh
      npm run dev
      ```

---

## Usage

- Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
- **Register** a new account or **Login** with an existing one.
- After logging in, you can:
  - **Create a channel**.
  - **Upload videos** to your channel.
  - **View** videos from the home page.
  - **Like, dislike, and comment** on videos.
  - **Edit and delete** your own comments and videos.
  - **Search** for videos by title.
  - **Filter** videos by category.

---
## How To Add New Videos
1. Log in to your account.
2. Navigate to your channel page.
3. Click on the "ADD Video" button.
4. Fill in the video details (title, description, etc.).
5. In Video URL field, you can add a link from youtube video link for example: https://www.youtube.com/watch?v=VIDEO_ID
6. Add a thumbnail image URL. if not Provide any thumbnail image then default image will be added.
7. Click "Submit" to upload your video.