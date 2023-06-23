# esc-hms-portal
Elements of Software Construction project 2023
Housing Management System for tenants and landlords

## Installation
1. git clone
2. Run *npm install* on both the frontend and backend
3. Install MySQL, create the database template by running *database-schema.sql*
    a. Keep the SQL file updated if you change the database schema before you commit
4. Add user and password to match backend/models/db.js. Right now it's user 'user' and password 'password'

## Running
1. cd frontend -> npm start
2. cd backend -> nodemon ./app.js (nodemon refreshes the server everytime you make changes)
3. server runs on port 3001 and client on port 3000