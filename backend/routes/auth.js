const express = require('express');
const authmodel = require('../models/auth-model');
var router = express.Router();

router.post('/login', (req, res) => {
    console.log("JSON req: " + JSON.stringify(req.body));
    const { username, password } = req.body;
  
    authmodel.loginUser(username, password, (err, user) => {
        if (err) {
            return res.status(400).send(err.message);
        }
    
        // Authentication successful, store user information in the session
        req.session.user = user;
        console.log("Login for %s successful", username)
    
        // Return 200 OK
        res.status(200).json({ message: 'User login successful' });
    });
});
  
router.post('/register', (req, res) => {
    console.log("JSON req: " + JSON.stringify(req.body));
    const { username, password } = req.body;

    authmodel.registerUser(username, password, (err, user) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        // Authentication successful, store user information in the session
        console.log("Registration for %s successful", username)
        req.session.user = user;
        console.log("Logged in as %s", username)

        // Return 200 OK
        res.status(200).json({ message: 'User registration successful' });
    });
});

module.exports = router;