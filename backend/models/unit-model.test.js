const unitModel = require('./unit-model');
const db = require('./db'); 

jest.mock('./db', () => ({
  query: jest.fn(),
}));

describe('Unit Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addUnit', () => {
    it('should add a new unit', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { insertId: 123 });
      });

      const callback = jest.fn();

      await unitModel.addUnit(
        '123 Main St',
        1,
        callback
      );

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, { insertId: 123 });
    });

    it('should return an error if address or landlordID is empty', async () => {
      const callback = jest.fn();

      await unitModel.addUnit(
        '',
        1,
        callback
      );

      expect(db.query).not.toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getUnits', () => {
    it('should get units by landlord', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ id: 1, address: '123 Main St', lease_id: 2 }]);
      });

      const callback = jest.fn();

      await unitModel.getUnits(1, callback);

      expect(db.query).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(null, [{ id: 1, address: '123 Main St', lease_id: 2 }]);
    });

    it('should return an error if landlordID is empty', async () => {
      const callback = jest.fn();

      await unitModel.getUnits('', callback);

      expect(db.query).not.toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteUnit', () => {
    it('should delete a unit', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      const callback = jest.fn();

      await unitModel.deleteUnit(1, callback);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });

    it('should return an error if unitID is empty', async () => {
      const callback = jest.fn();

      await unitModel.deleteUnit('', callback);

      expect(db.query).not.toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });
        

});
});
