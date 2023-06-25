const express = require('express');
const authModel = require('../models/auth-model');
const leaseModel = require('../models/lease-model');
var router = express.Router();

router.get('/get-leases', authModel.requireTenantLogin, (req, res) => {
    //TODO
});

module.exports = router;