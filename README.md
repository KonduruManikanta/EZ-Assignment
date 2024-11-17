### README File for File Sharing System Project

# File Sharing System

A secure and efficient file-sharing application built with **Node.js**, **Express**, and **SQLite**. This project provides user authentication, file upload/download functionalities, and ensures secure storage and access control for files.



## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features
- User authentication with secure password hashing.
- Email verification for new users.
- Role-based file access and management.
- Support for uploading, listing, downloading, and deleting files.
- File type validation for secure uploads.
- JWT-based authentication.
- SQLite as the database for lightweight and portable storage.

---

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **File Handling**: Multer for file uploads
- **Testing**: Jest, Supertest
- **Deployment**: PM2, Nginx

---

## Installation
### Prerequisites
- Node.js installed (v14 or later recommended)
- SQLite installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/KonduruManikanta/EZ-Assignment/tree/main
   cd file-sharing-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=<your-secret-key>
   DATABASE_URL=file-sharing-system.db
   ```

4. Set up the database:
   ```bash
   node setupDatabase.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

The application will run on `http://localhost:3000`.

---

## Usage
### 1. Register a User
- Endpoint: `/api/auth/signup`
- Method: `POST`
- Body:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### 2. Login
- Endpoint: `/api/auth/login`
- Method: `POST`
- Body:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### 3. File Upload
- Endpoint: `/api/files/upload`
- Method: `POST`
- Header: `Authorization: Bearer <your_jwt_token>`
- Body: Multipart form-data with `file`.

### 4. File Download
- Endpoint: `/api/files/download-file/:file_id`
- Method: `GET`
- Header: `Authorization: Bearer <your_jwt_token>`

Refer to the [API Endpoints](#api-endpoints) section for more details.

---

## API Endpoints

### **Authentication**
| Endpoint               | Method | Description                  |
|------------------------|--------|------------------------------|
| `/api/auth/signup`     | POST   | Register a new user          |
| `/api/auth/login`      | POST   | Login and get JWT            |
| `/api/auth/verify-email/:code` | GET   | Verify user email            |

### **File Operations**
| Endpoint                      | Method | Description                   |
|-------------------------------|--------|-------------------------------|
| `/api/files/upload`           | POST   | Upload a file                 |
| `/api/files/list-files`       | GET    | List files for the user       |
| `/api/files/download-file/:id`| GET    | Download a file by ID         |
| `/api/files/delete-file/:id`  | DELETE | Delete a file by ID           |

---

## Testing
### Automated Testing
- Tests are written using **Jest** and **Supertest**.
- To run the tests:
  ```bash
  npm test
  ```

### Manual Testing
Detailed test cases are documented in the `TEST_CASES.md` file.

---

## Deployment
### Production Environment Setup
1. Provision a server on a cloud platform like AWS, Azure, or DigitalOcean.
2. Install necessary dependencies:
   ```bash
   sudo apt update
   sudo apt install nodejs npm sqlite3 nginx
   ```
3. Deploy the codebase:
   ```bash
   git clone https://github.com/KonduruManikanta/EZ-Assignment/tree/main
   cd file-sharing-system
   npm install
   ```
4. Configure the `.env` file with production settings.
5. Start the server using PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name file-sharing-system
   ```

Refer to `DEPLOYMENT.md` for detailed instructions.

---

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your forked repository.
4. Submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

