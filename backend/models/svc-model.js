const connection = require('./db.js');

const STATUS = Object.freeze({
    NEW : 'new',
    QUOT_PENDING : 'quot_pending',
    ACCEPTED: 'accepted',
    REJECTED : 'rejected',
    COMPLETED : 'completed',
    CANCELED : 'canceled'
});

async function createSvcRequest(tenantID, leaseID, title, description, quot_required, photoPath, callback){
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' '); 
    //First check if unit assoc with lease is owned by logged in landlord
    let query = 'SELECT tenant.id FROM tenant JOIN lease ON tenant.id = lease.tenant_id WHERE lease.id = ?';
    connection.query(query, [leaseID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(new Error("Lease not found."));
        }
        if(results[0].id != tenantID){
            return callback(new Error('Unauthorized: User does not own this lease'));
        }
        query = 'INSERT INTO svc_request (lease_id, submit_time, status, title, description, quot_required, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [leaseID, formattedDateTime, STATUS.NEW, title, description, quot_required, photoPath], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        })
    });
}

//Returns only ID, lease ID, title and status of ALL svc requests
async function getSvcRequestByTenant(tenantID, callback){
    const query = 'SELECT svc_request.id, lease_id, status, title from svc_request JOIN lease ON svc_request.lease_id = lease.id WHERE lease.tenant_id = ?';
    connection.query(query, [tenantID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

//Returns only ID, lease ID, title and status of ALL svc requests
async function getSvcRequestByLandlord(landlordID, callback){
    const query = 'SELECT svc_request.id, lease_id, status, title from svc_request JOIN lease ON svc_request.lease_id = lease.id JOIN unit ON lease.unit_id = unit.id WHERE unit.landlord_id = ?';
    connection.query(query, [landlordID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

//Returns all details of specific SVC request
async function getSvcRequestDetails(svcID, callback){
    const query = 'SELECT * from svc_request WHERE id = ?';
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

//Use this to set svc request status to accepted, rejected, cancelled or completed. If it is rejected, cancelled or completed, close time is added.
//If accepted, assumed that no quotation is needed - quot_required will be set to FALSE.
async function changeSvcRequestStatus(svcID, status, callback){
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    if(status == STATUS.REJECTED || status == STATUS.CANCELED || status == STATUS.COMPLETED){
        const query = `UPDATE svc_request SET status = ?, closed_time = ? WHERE id = ?`;
        connection.query(query, [status, formattedDateTime, svcID], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        });
    }
    if(status == STATUS.ACCEPTED){
        const query = `UPDATE svc_request SET status = ?, quot_required = FALSE WHERE id = ?`;
        connection.query(query, [status, svcID], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        });
    }
}

async function addSvcFeedback(svcID, feedback, callback){
    const query = `UPDATE svc_request SET feedback = ? WHERE id = ?`;
    connection.query(query, [feedback, svcID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

async function acceptSvcQuotation(svcID, callback){
    const query = `UPDATE svc_request SET quot_accepted = TRUE, status = "accepted" WHERE id = ?`;
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

async function addSvcQuotation(filePath, svcID, quotAmount, callback){
    const query = `UPDATE svc_request SET status = "quot_pending", quot_required = TRUE, quot_amount = ?, quot_attachment = ? WHERE id = ?`;
    connection.query(query, [quotAmount, filePath, svcID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

//Helper funcs to check if user is authorized to modify a svc request

async function verifyMatchingTenantAndSVC(tenantID, svcID, callback){
    let query = 'SELECT tenant.id FROM tenant JOIN lease ON tenant.id = lease.tenant_id JOIN svc_request ON lease.id = svc_request.lease_id WHERE svc_request.id = ?';
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(false);
        }
        if(results[0].id != tenantID){
            return callback(false);
        }
        return callback(true);
    });
}

async function verifyMatchingLandlordAndSVC(landlordID, svcID, callback){
    let query = 'SELECT landlord.id FROM landlord JOIN unit ON landlord.id = unit.landlord_id JOIN lease ON unit.id = lease.unit_id JOIN svc_request ON lease.id = svc_request.lease_id WHERE svc_request.id = ?';
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(false);
        }
        if(results[0].id != landlordID){
            return callback(false);
        }
        return callback(true);
    });
}

async function getPhotoPathFromSvcID(svcID, callback){
    const query = 'SELECT photo_path FROM svc_request WHERE id = ?'
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(new Error("File not found :("));
        }
        return callback(null,results[0].photo_path);
    });
}

async function getQuotationPathFromSvcID(svcID, callback){
    const query = 'SELECT quot_attachment FROM svc_request WHERE id = ?'
    connection.query(query, [svcID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(new Error("File not found :("));
        }
        return callback(null,results[0].quot_attachment);
    });
}

module.exports = {STATUS, getPhotoPathFromSvcID, getSvcRequestDetails, createSvcRequest, getSvcRequestByTenant, getSvcRequestByLandlord, changeSvcRequestStatus, addSvcFeedback, verifyMatchingLandlordAndSVC, verifyMatchingTenantAndSVC, addSvcQuotation, getQuotationPathFromSvcID, acceptSvcQuotation};