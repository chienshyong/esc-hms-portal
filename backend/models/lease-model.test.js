const leaseModel = require('./lease-model');
const db = require('./db');

jest.mock('./db', () => ({
  query: jest.fn(),
}));

describe('Lease Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addLease', () => {
    it('should add a new lease', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ id: 1 }]);
        } else if (query.includes('INSERT')) {
          callback(null, { insertId: 123 });
        }
      });

      const callback = jest.fn();

      await leaseModel.addLease(
        'tenant1',
        1,
        1500,
        '2023-08-01',
        '2024-08-01',
        1000,
        'Retail',
        callback
      );

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(null, { insertId: 123 });
    });

    it('should return an error if tenant user not found', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, []); // Simulate no matching tenant
      });

      const callback = jest.fn();

      await leaseModel.addLease(
        'tenant1',
        1,
        1500,
        '2023-08-01',
        '2024-08-01',
        1000,
        'Retail',
        callback
      );

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getLeasesByTenant', () => {
    it('should get leases by tenant', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ id: 1, unit_id: 1, monthly_rental: 1500 }]);
      });

      const callback = jest.fn();

      await leaseModel.getLeasesByTenant(1, callback);

      expect(db.query).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(null, [{ id: 1, unit_id: 1, monthly_rental: 1500 }]);
    });
  });

  describe('getLeasesByLandlord', () => {
    it('should get leases by landlord', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ id: 1, unit_id: 1, monthly_rental: 1500 }]);
      });

      const callback = jest.fn();

      await leaseModel.getLeasesByLandlord(1, callback);

      expect(db.query).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(null, [{ id: 1, unit_id: 1, monthly_rental: 1500 }]);
    });
  });

  describe('deleteLease', () => {
    it('should delete a lease', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ id: 1, landlord_id: 1 }]); // Simulate matching lease
        } else if (query.includes('DELETE')) {
          callback(null, { affectedRows: 1 });
        }
      });

      const callback = jest.fn();

      await leaseModel.deleteLease(1, 1, callback);

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });
  });

  describe('terminateLease', () => {
    it('should terminate a lease', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ id: 1, landlord_id: 1 }]); // Simulate matching lease
        } else if (query.includes('UPDATE')) {
          callback(null, { affectedRows: 1 });
        }
      });

      const callback = jest.fn();

      await leaseModel.terminateLease(1, 1, '2023-08-01', callback);

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });
  });
});
