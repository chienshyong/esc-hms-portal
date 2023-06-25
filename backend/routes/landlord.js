const express = require('express');
const authModel = require('../models/auth-model');
const unitModel = require('../models/unit-model');
const leaseModel = require('../models/lease-model');
var router = express.Router();

router.post('/add-unit', authModel.requireLandlordLogin, (req, res) => {
    const {address} = req.body;
    const landlordID = req.session.user.id;
    unitModel.addUnit(address, landlordID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json({ message: 'Add unit successful' }); // Add Unit successful      
    });
});

//Returns all rows from UNIT table, including id, address and lease_id, that matches the logged in landlord.
router.get('/get-units', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    unitModel.getUnits(landlordID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.delete('/remove-unit', authModel.requireLandlordLogin, (req, res) => {
    const unitID = req.body.id;
    unitModel.deleteUnit(unitID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

module.exports = router;