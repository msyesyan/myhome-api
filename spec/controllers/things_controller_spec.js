const path = require('path');
const chai = require('chai');
const expect = chai.expect;
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Thing = require(path.resolve('./models/thing.js'));
const server = require(path.resolve('./server.js'));

const buildThing = () => {
  return new Thing({name: 'thing'});
};

describe('Things', () => {
  describe('POST thing', () => {
    it('should create thing', (done) => {
      chai.request(server).
        post('/things').
        send({name: 'thing'}).
        end((err, res) => {
          expect(res).to.have.status('201');
          done();
        });
    });
  });

  describe('GET things', () => {
    it('should GET all things', (done) => {
      chai.request(server).get('/things').end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
  });


  describe('PUT thing', () => {
    it('should Update thing', (done) => {
      buildThing().save((err, thing) => {
        chai.request(server).put(`/things/${thing.id}`, {
          name: 'thingModify'
        }).end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('DEL thing', () => {
    it('should DEL thing', (done) => {
      buildThing().save((err, thing) => {
        chai.request(server).del(`/things/${thing.id}`).end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });
});
