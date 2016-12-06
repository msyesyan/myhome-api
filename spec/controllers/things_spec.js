const helper = require('../spec_helper');

describe('Things', () => {
  describe('GET things', () => {
    it('should GET all things', () => {
      chai.request(server).get('/things').end((err, res) => {
        res.should.have.status(200);
      });
    });
  });
});
