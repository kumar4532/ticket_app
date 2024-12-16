# TourBooking App
### This is a simple tour package booking app.

## Table of Contents
- Features
- Technologies
- Project Setup
- Environment Variables
- Running the Application

## Features
* User Authentication: Secure login system using JWT tokens.
* User: Can book packages which will generate an invoice which is a downloadable pdf file.
* Admin: 
    1. Can create, update and delete packages.
    2. Show all of the bookings of packages.
* Error Handling: Proper error messages for invalid inputs or missing fields.

## Technologies
+ Backend: Node.js, Express.js, Mongoose
+ Frontend: React.js, TailwindCSS, DaisyUI, React-Icons 
+ Database: MongoDB
+ Authentication: JWT for user authentication
+ Other Libraries:
  1. bcryptjs: For hashing passwords.
  2. dotenv: For environment variable management.
  3. cookie-parser: For handling cookies.

## Project Setup

**Installation**
Clone the repository:

```
git clone https://github.com/kumar4532/ticket_app.git
```

Install dependencies:
```
npm install
```

Create a .env file in the root directory and add the following variables (see the Environment Variables section below).

Ensure MongoDB is running either locally or through a service like MongoDB Atlas.

### Environment Variables
Create a .env file in the root of your project and set the following variables:

```
PORT=<Any port>
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
```
> [!NOTE]
> PORT: Port where you can listen to your app.
> MONGO_URI: The connection string for your MongoDB instance.
> JWT_SECRET: A secret key for signing JWT tokens.

## Running the Application

Start the backend:
```
npm run dev
```
This will run the server using nodemon, which automatically restarts the server upon file changes.

Start the frontend:
```
cd frontend
npm run dev
```

Build the app:
```
npm run build
```

Production Mode
```
npm start
```