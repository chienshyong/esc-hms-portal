const express = require('express');
const authModel = require('../models/auth-model');
const unitModel = require('../models/unit-model');
const leaseModel = require('../models/lease-model');
const svcModel = require('../models/svc-model');
var router = express.Router();

router.put('/link-email', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const email = req.body.email;
    authModel.linkEmail(landlordID, authModel.USERTYPE.LANDLORD, email, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json({ message: 'Link email successful' });    
    });
})

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

router.post('/add-lease', authModel.requireLandlordLogin, (req, res) => {
    const {tenantUsername, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType} = req.body;
    leaseModel.addLease(tenantUsername, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.get('/get-leases', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    leaseModel.getLeasesByLandlord(landlordID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.delete('/delete-lease', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const leaseID = req.body.id;
    leaseModel.deleteLease(landlordID, leaseID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
})

router.patch('/terminate-lease', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const leaseID = req.body.id;
    const terminationDate = req.body.terminationDate;
    leaseModel.terminateLease(landlordID, leaseID, terminationDate, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
})

router.get('/get-svc-requests', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    svcModel.getSvcRequestByLandlord(landlordID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.patch('/accept-svc-request', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingLandlordAndSVC(landlordID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.changeSvcRequestStatus(svcID, svcModel.STATUS.ACCEPTED, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.patch('/reject-svc-request', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingLandlordAndSVC(landlordID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.changeSvcRequestStatus(svcID, svcModel.STATUS.REJECTED, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.patch('/complete-svc-request', authModel.requireLandlordLogin, (req, res) => {
    const landlordID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingLandlordAndSVC(landlordID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.changeSvcRequestStatus(svcID, svcModel.STATUS.COMPLETED, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

module.exports = router;