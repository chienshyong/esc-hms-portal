const express = require('express');
const authModel = require('../models/auth-model');
const leaseModel = require('../models/lease-model');
const svcModel = require('../models/svc-model');
var router = express.Router();

router.put('/link-email', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const email = req.body.email;
    authModel.linkEmail(tenantID, authModel.USERTYPE.TENANT, email, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json({ message: 'Link email successful' });    
    });
})

router.get('/get-leases', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    leaseModel.getLeasesByTenant(tenantID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.post('/create-svc-request', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const {leaseID, title, description} = req.body;
    svcModel.createSvcRequest(tenantID, leaseID, title, description, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

module.exports = router;