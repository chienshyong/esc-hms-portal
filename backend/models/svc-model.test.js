const svcModel = require('./svc-model');
const db = require('./db.js');

jest.mock('./db', () => ({
  query: jest.fn(),
}));

describe('Service Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSvcRequest', () => {
    it('should create a new service request', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ id: 1 }]);
        } else if (query.includes('INSERT INTO')) {
          callback(null, { affectedRows: 1 });
        }
      });

      const callback = jest.fn();

      await svcModel.createSvcRequest(1, 1, 'Title', 'Description', false, 'photo.jpg', callback);

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });

    it('should return an error if lease not found', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, []);
        }
      });

      const callback = jest.fn();

      await svcModel.createSvcRequest(1, 1, 'Title', 'Description', false, 'photo.jpg', callback);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return an error if unauthorized', async () => {
      db.query
        .mockImplementationOnce((query, values, callback) => {
          if (query.includes('SELECT')) {
            callback(null, []);
          }
        });
    
      const callback = jest.fn();
    
      await svcModel.createSvcRequest(1, 1, 'Title', 'Description', false, 'photo.jpg', callback);
    
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error));
    });
    
  });

  describe('getSvcRequestByTenant', () => {
    it('should get service requests by tenant', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ id: 1, lease_id: 1, status: 'new', title: 'Title' }]);
        }
      });

      const callback = jest.fn();

      await svcModel.getSvcRequestByTenant(1, callback);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, [{ id: 1, lease_id: 1, status: 'new', title: 'Title' }]);
    });
  });


  describe('getQuotationPathFromSvcID', () => {
    it('should get quotation path from service ID', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ quot_attachment: 'quotation.pdf' }]);
        }
      });

      const callback = jest.fn();

      await svcModel.getQuotationPathFromSvcID(1, callback);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, 'quotation.pdf');
    });
  });
});
