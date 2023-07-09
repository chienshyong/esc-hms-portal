const connection = require('./db.js');
const bcrypt = require('bcrypt');

const USERTYPE = Object.freeze({
  TENANT : 'tenant',
  LANDLORD : 'landlord'
});

async function loginUser(username, password, userType, callback) {
    const query = 'SELECT * FROM ' + userType + ' WHERE username = ?';
    connection.query(query, [username], (err, results) => {
      if (err) return callback(err);
  
      if (results.length === 0) {
        // User not found
        return callback(new Error('User not found'));
      }
  
      const user = results[0];
  
      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return callback(err);
  
        if (isMatch) {
          // Passwords match, authentication successful
          console.log("%s login for %s successful", userType, username)
          return callback(null, user);
        } else {
          // Passwords do not match
          return callback(new Error('Password does not match'));
        }
      });
    });
  }

async function registerUser(username, password, userType, callback) {
    if(username.length == 0 || password.length == 0){
        const nullError = new Error('Error: Username or password empty');
        return callback(nullError);
    }
    saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log("Password hash: " + hash);
        const query = 'INSERT INTO ' + userType + ' (username, password) VALUES (?, ?)';
        connection.query(query, [username, hash], (error, results) => {
            if (error) return callback(error);
            console.log("%s registration for %s successful", userType, username)
            return callback(null, username);
        });
    });
}

//Middleware to only allow request if logged in as tenant
const requireTenantLogin = (req, res, next) => {
  if (req.session.user && req.session.userType === USERTYPE.TENANT) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized - tenant only' });
  }
};

//Middleware to only allow request if logged in as landlord
const requireLandlordLogin = (req, res, next) => {
  if (req.session.user && req.session.userType === USERTYPE.LANDLORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized - landlord only' });
  }
};

module.exports = {USERTYPE, loginUser, registerUser, requireTenantLogin, requireLandlordLogin};

