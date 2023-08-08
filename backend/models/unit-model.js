const connection = require('./db.js');

async function addUnit(address, landlordID, callback) {
    if(address.length == 0 || landlordID.length == 0){
        const nullError = new Error('Error: Address or Landlord field empty');
        return callback(nullError);
    }
    const query = 'INSERT INTO unit (address, landlord_id) VALUES (?, ?)';
    connection.query(query, [address, landlordID], (error, results) => {
        if (error) return callback(error);
        console.log("Add unit %s successful", address);
        return callback(null, results);
    });
}

async function getUnits(landlordID, callback) {
    if(landlordID.length == 0){
        const nullError = new Error('Error: Landlord field empty');
        return callback(nullError);
    }
    const query = 'SELECT unit.id, unit.address, lease.id AS "lease_id" FROM unit LEFT JOIN lease ON unit.id=lease.unit_id WHERE landlord_id = ?';
    connection.query(query, [landlordID], (error, results) => {
        if (error) return callback(error);
        console.log("getUnits successful, %i records fetched", results.length);
        return callback(null, results);
    });
}

async function deleteUnit(landlordID, unitID, callback) {
    let query = 'SELECT landlord.id FROM landlord JOIN unit ON landlord.id = unit.landlord_id WHERE unit.id = ?'
    connection.query(query, [unitID], (err, results) => {
        if (err) return callback(err);
        if(results[0].id != landlordID){
            return callback(new Error('Unauthorized: User does not own this unit'));
        }
        if(unitID.length == 0){
            const nullError = new Error('Error: Unit ID field empty');
            return callback(nullError);
        }
        const query = 'DELETE FROM unit WHERE id = ?';
        connection.query(query, [unitID], (error, results) => {
            if (error) return callback(error);
            if(results.affectedRows === 0){
                return callback(new Error('Error: ID does not exist or has already been deleted'), results);
            }
            console.log("Unit %i deleted", unitID);
            return callback(null, results);
        });
    })
}

module.exports = {addUnit, getUnits, deleteUnit};