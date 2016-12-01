const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Things', () => {
  describe('GET things', () => {
    it('should GET all things', () => {
      chai.request(server).get('/things').end((err, res) => {
        res.should.have.status(200);
      });
    });
  });
});
