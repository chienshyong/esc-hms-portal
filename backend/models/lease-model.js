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

module.exports = {addLease};