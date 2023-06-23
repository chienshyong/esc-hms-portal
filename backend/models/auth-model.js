const connection = require('./db.js');
const bcrypt = require('bcrypt');

async function loginUser(username, password, callback) {
    // Retrieve the user record from the database based on the provided username
    const query = 'SELECT * FROM tenant WHERE username = ?';
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
          return callback(null, user);
        } else {
          // Passwords do not match
          return callback(new Error('Password does not match'));
        }
      });
    });
  }

async function registerUser(username, password, callback) {
    if(username.length == 0 || password.length == 0){
        const nullError = new Error('Error: Username or password empty');
        return callback(nullError);
    }
    saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log("Password hash: " + hash);
        const query = 'INSERT INTO tenant (username, password) VALUES (?, ?)';
        const values = [username, hash];
        connection.query(query, values, (error, results) => {
            if (error) return callback(error);
            return callback(null, username);
        });
    });
}

module.exports = {loginUser, registerUser};

