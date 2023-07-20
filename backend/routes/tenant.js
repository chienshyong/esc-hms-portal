const express = require('express');
const authModel = require('../models/auth-model');
const leaseModel = require('../models/lease-model');
const svcModel = require('../models/svc-model');
const upload = require('../models/upload-middleware');
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

router.get('/get-svc-requests', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    svcModel.getSvcRequestByTenant(tenantID, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.get('/get-svc-request-details', authModel.requireLandlordLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingTenantAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.getSvcRequestDetails(svcID, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.get('/get-svc-request-photo', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingLandlordAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.getPhotoPathFromSvcID(svcID, (err, path) => {
                if (err) { return res.status(400).send(err.message); }
                console.log("File has been requested: " + path);
                res.download(path, (error) => {
                    if (error) {
                      console.error('Error downloading file:', error);
                      res.status(500).json({ error: 'Failed to download file' });
                    }
                });
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to access this SVC request' });
        }
    });
});

router.post('/create-svc-request', authModel.requireTenantLogin, upload.single('photo'), (req, res) => {
    console.log(req.file); //Log uploaded file data
    console.log("creating tenant svc req")
    if (req.file != undefined) {
    const photoPath = req.file.path;}
    else { const photoPath = undefined}
    console.log(req.session)
    const tenantID = req.session.user.id;
    const {leaseID, title, description} = req.body;
    svcModel.createSvcRequest(tenantID, leaseID, title, description, photoPath, (err, results) => {
        if (err) { return res.status(400).send(err.message); }
        res.status(200).json(results); 
    });
});

router.patch('/cancel-svc-request', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingTenantAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.changeSvcRequestStatus(svcID, svcModel.STATUS.CANCELED, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.get('/get-svc-quotation', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingTenantAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.getQuotationPathFromSvcID(svcID, (err, path) => {
                if (err) { return res.status(400).send(err.message); }
                console.log("File has been requested: " + path);
                res.download(path, (error) => {
                    if (error) {
                      console.error('Error downloading file:', error);
                      res.status(500).json({ error: 'Failed to download file' });
                    }
                });
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.patch('/accept-svc-quotation', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const svcID = req.body.svcID;
    svcModel.verifyMatchingTenantAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.acceptSvcQuotation(svcID, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

router.patch('/svc-feedback', authModel.requireTenantLogin, (req, res) => {
    const tenantID = req.session.user.id;
    const {svcID, feedback} = req.body;
    svcModel.verifyMatchingTenantAndSVC(tenantID, svcID, (isAuth) => {
        if(isAuth){
            svcModel.addSvcFeedback(svcID, feedback, (err, results) => {
                if (err) { return res.status(400).send(err.message); }
                res.status(200).json(results); 
            });
        } else{
            return res.status(401).json({ message: 'Unauthorized to modify this SVC request' });
        }
    });
});

module.exports = router;