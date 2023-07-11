# esc-hms-portal
Elements of Software Construction project 2023
Housing Management System for tenants and landlords

## Installation
1. git clone
2. Run *npm install* on both the frontend and backend
3. Install MySQL, create the database template by running *database-schema.sql*. Please keep the SQL file updated if you change the database schema before you commit
4. Add user and password to match backend/models/db.js. Right now it's user 'user' and password 'password'

## Running
Backend: nodemon ./app.js

## API Listing
- POST auth/tenant-login: username, password
- POST auth/tenant-register: username, password
- POST auth/landlord-login: username, password
- POST auth/landlord-register: username, password

__Require login session as Tenant:__
- PUT tenant/link-email: email
- GET tenant/get-leases
- GET tenant/get-svc-requests __TODO__
- POST tenant/create-svc-request: leaseID, title, description

__Require login session as Landlord:__
- PUT landlord/link-email: email
- POST landlord/add-unit: address
- GET landlord/get-units
- DELETE landlord/remove-unit: id
- POST landlord/add-lease: tenantUsername, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType
- GET landlord/get-leases
- DELETE landlord/remove-lease: id
- PATCH landlord/terminate-lease: id, terminationDate
- GET landlord/get-svc-requests __TODO__