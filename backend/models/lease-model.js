const connection = require('./db.js');

//str, int, float, date, date, int, str
async function addLease(tenantUsername, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType, callback) {
    const query = 'SELECT * FROM tenant WHERE username = ?';
    connection.query(query, [tenantUsername], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(new Error('Tenant user not found'));
        }
        const tenantID = results[0].id;

        const query = 'INSERT INTO lease (tenant_id, unit_id, monthly_rental, commencement_date, expiry_date, area_in_sq, trade_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [tenantID, unitID, monthlyRental, commencementDate, expiryDate, areaInSq, tradeType], (error, results) => {
            if (error) return callback(error);
            console.log("Add lease successful " + results.insertID);
            return callback(null, results);
        });
    });
}

async function getLeasesByTenant(tenantID, callback) {
    const query = 'SELECT unit.id AS "unit_id", unit.address, lease.id FROM lease INNER JOIN unit ON lease.unit_id=unit.id WHERE tenant_id = ?';
    connection.query(query, [tenantID], (err, results) => {
        if (err) return callback(err);
        return callback(null, results);
    });
}

async function getLeasesByLandlord(landlordID, callback) {
    const query = 'SELECT lease.* FROM lease JOIN unit ON lease.unit_id = unit.id WHERE unit.landlord_id = ?';
    connection.query(query, [landlordID], (err, results) => {
        if (err) return callback(err);
        console.log("getLeases successful, %i records fetched", results.length);
        return callback(null, results);
    });
}

async function deleteLease(landlordID, leaseID, callback) {
    //First check if unit assoc with lease is owned by logged in landlord
    let query = 'SELECT landlord.id FROM landlord JOIN unit ON landlord.id = unit.landlord_id JOIN lease ON unit.id = lease.unit_id WHERE lease.id = ?';
    connection.query(query, [leaseID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(new Error("Lease not found."));
        }
        if(results[0].id != landlordID){
            return callback(new Error('Unauthorized: User does not own this lease'));
        }
        query = 'DELETE FROM lease WHERE id = ?';
        connection.query(query, [leaseID], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        })
    });
}

async function terminateLease(landlordID, leaseID, terminationDate, callback) {
    //First check if unit assoc with lease is owned by logged in landlord
    let query = 'SELECT landlord.id FROM landlord JOIN unit ON landlord.id = unit.landlord_id JOIN lease ON unit.id = lease.unit_id WHERE lease.id = ?';
    connection.query(query, [leaseID], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0){
            return callback(new Error("Lease not found."));
        }
        if(results[0].id != landlordID){
            return callback(new Error('Unauthorized: User does not own this lease'));
        }
        query = `UPDATE lease SET termination_date = ? WHERE id = ?`;
        connection.query(query, [terminationDate, leaseID], (err, results) => {
            if (err) return callback(err);
            return callback(null,results);
        })
    });
}

module.exports = {addLease, getLeasesByLandlord, getLeasesByTenant, deleteLease, terminateLease};