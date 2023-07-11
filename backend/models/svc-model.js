const connection = require('./db.js');

const STATUS = Object.freeze({
    NEW : 'new',
    REJECTED : 'rejected',
    QUOT_PENDING : 'quot_pending',
    ACCEPTED: 'accepted',
    CLOSED : 'closed'
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

module.exports = {STATUS, createSvcRequest};