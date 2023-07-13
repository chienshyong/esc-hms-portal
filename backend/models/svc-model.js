const connection = require('./db.js');

const STATUS = Object.freeze({
    NEW : 'new',
    QUOT_PENDING : 'quot_pending',
    ACCEPTED: 'accepted',
    REJECTED : 'rejected',
    COMPLETED : 'completed',
    CANCELED : 'canceled'
});

async function createSvcRequest(tenantID, leaseID, title, description, callback){
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
        query = 'INSERT INTO svc_request (lease_id, submit_time, status, title, description) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [leaseID, formattedDateTime, STATUS.NEW, title, description], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        })
    });
}

async function getSvcRequestByTenant(tenantID, callback){
    const query = 'SELECT svc_request.* from svc_request JOIN lease ON svc_request.lease_id = lease.id WHERE lease.tenant_id = ?';
    connection.query(query, [tenantID], (err, results) => {
        if (err) return callback(err);
        return callback(null,results);
    });
}

async function getSvcRequestByLandlord(landlordID, callback){
    const query = 'SELECT svc_request.* from svc_request JOIN lease ON svc_request.lease_id = lease.id JOIN unit ON lease.unit_id = unit.id WHERE unit.landlord_id = ?';
    connection.query(query, [landlordID], (err, results) => {
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

module.exports = {STATUS, createSvcRequest, getSvcRequestByTenant, getSvcRequestByLandlord, changeSvcRequestStatus, addSvcFeedback, verifyMatchingLandlordAndSVC, verifyMatchingTenantAndSVC, addSvcQuotation};