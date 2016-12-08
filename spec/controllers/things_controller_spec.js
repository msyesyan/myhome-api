const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const should = chai.should();
const server = require(path.resolve('./server.js'));
const Thing = require(path.resolve('./models/thing.js'));

const buildThing = () => {
  return new Thing({name: 'thing'});
};

describe('Things', () => {
  describe('POST thing', () => {
    it('should create thing', () => {
      chai.request(server).post('/things', {name: 'thing'}).end((err, res) => {
        res.should.have.status(203);
      });
    });
  });

  describe('GET things', () => {
    it('should GET all things', () => {
      chai.request(server).get('/things').end((err, res) => {
        res.should.have.status(200);
      });
    });
  });


  describe('PUT thing', () => {
    it('should Update thing', () => {
      buildThing().save((err, thing) => {
        chai.request(server).put(`/things/${thing.id}`, {
          name: 'thingModify'
        }).end((err, res) => {
          res.should.have.status(202);
        });
      });
    });
  });

  describe('DEL thing', () => {
    it('should DEL thing', () => {
      buildThing().save((err, thing) => {
        chai.request(server).del(`/things/${thing.id}`).end((err, res) => {
          res.should.have.status(200);
        });
      });
    });
  });
});
