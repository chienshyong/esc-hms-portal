const express = require('express');
const authmodel = require('../models/auth-model');
var router = express.Router();

router.post('/tenant-login', (req, res) => {
    const { username, password } = req.body;
  
    authmodel.loginUser(username, password, authmodel.USERTYPE.TENANT, (err, user) => {
        if (err) {
            return res.status(400).send(err.message); //400 Bad Request
        }
        // Authentication successful, store user information in the session
        // Use these to check if user has logged in, and whether they are tenant or landlord
        data = {...user, role:authmodel.USERTYPE.TENANT}; //User's ID, username and type.
        console.log(req.session)
        //res.status(200).json({ message: 'User login successful' });
        res.status(200).json(data);
    });
});
  
router.post('/tenant-register', (req, res) => {
    const { username, password } = req.body;

    authmodel.registerUser(username, password, authmodel.USERTYPE.TENANT, (err, user) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.status(200).json({ message: 'User registration successful' });
    });
});

router.post('/landlord-login', (req, res) => {
    const { username, password } = req.body;
  
    authmodel.loginUser(username, password, authmodel.USERTYPE.LANDLORD, (err, user) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        data = {...user, role:authmodel.USERTYPE.LANDLORD};
        console.log(user)
        //res.status(200).json({ message: 'User login successful' });
        res.status(200).json(data);
    });
});
  
router.post('/landlord-register', (req, res) => {
    const { username, password } = req.body;

    authmodel.registerUser(username, password, authmodel.USERTYPE.LANDLORD, (err, user) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.status(200).json({ message: 'User registration successful' });
    });
});

module.exports = router;