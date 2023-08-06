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
- GET tenant/get-svc-requests
- GET tenant/get-svc-request-details: svcID
- GET tenant/get-svc-request-photo: svcID
- POST tenant/create-svc-request: leaseID, title, description, photo
- GET tenant/get-svc-quotation: svcID
- PATCH tenant/accept-svc-quotation
- PATCH tenant/cancel-svc-request: svcID
- PATCH tenant/svc-feedback: svcID, feedback

__Require login session as Landlord:__
- PUT landlord/link-email: email
- POST landlord/add-unit: address
- GET landlord/get-units
- DELETE landlord/remove-unit: id
- POST landlord/add-lease: tenantUsername, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType
- GET landlord/get-leases
- DELETE landlord/remove-lease: id
- PATCH landlord/terminate-lease: id, terminationDate
- GET landlord/get-svc-requests
- GET landlord/get-svc-request-details: svcID
- GET landlord/get-svc-request-photo: svcID
- PATCH landlord/reject-svc-request: svcID
- PATCH landlord/accept-svc-request: svcID
- PATCH landlord/svc-add-quotation: file, svcID, quotationAmount
- PATCH landlord/complete-svc-request: svcID


## Selenium Test Run:

1. download auqa via links:
https://www.jetbrains.com/aqua/download/#section=windows

2. install oracle 11 JDK:
https://www.oracle.com/sg/java/technologies/javase/jdk11-archive-downloads.html

3. you can copy the file into your new project with gradle and selenium:

file directory:
..\Selenium Test\gradle2\src\test\java\com\example\gradle2

New project creation(do not select "Add sample code"):
![image](https://github.com/chienshyong/esc-hms-portal/assets/50765120/2d354b70-3b2e-4c73-b26b-f6367b4af5a3)


