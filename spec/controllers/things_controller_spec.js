const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Thing = require(path.resolve('./models/thing.js'));
const server = require(path.resolve('./server.js'));
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mongodb');
const database = Thing.db.db;

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const compose = (...funcs) => (...args) => funcs.reduceRight((result, func) => [func(...result)], args)[0];
const cleanDB = (callback) => databaseCleaner.clean(database, callback);
const after = (...callbacks) => compose(...[cleanDB].concat(callbacks))();

const buildThing = () => {
  return new Thing({name: 'thing'});
};

const thingUrl = (thing) => {
  return `/things/${thing.id}`;
};

describe('ThingsController', () => {
  describe('POST thing', () => {
    it('should create thing', (done) => {
      request(server).post('/things').send({
        thing: {
          name: 'thing'
        }
      }).end((err, res) => {
        expect(res).to.have.status('201');
        expect(res.body.name).to.eq('thing');
        expect(res.body).to.have.property('_id');
        after(() => done);
      });
    });
  });

  describe('GET things', () => {
    it('should GET all things', (done) => {
      buildThing().save((err, thing) => {
        request(server).get('/things').end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.eq(1);
          expect(res.body[0].name).to.eq(thing.name);
          after(() => done);
        });
      });
    });
  });


  describe('PUT thing', () => {
    it('should Update thing', (done) => {
      buildThing().save((err, thing) => {
        request(server).put(thingUrl(thing)).send({
          name: 'thingModify'
        }).end((err, res) => {
          expect(res).to.have.status(200);
          after(() => done);
        });
      });
    });
  });

  describe('DEL thing', () => {
    it('should DEL thing', (done) => {
      buildThing().save((err, thing) => {
        request(server).del(thingUrl(thing)).end((err, res) => {
          expect(res).to.have.status(200);
          after(() => done);
        });
      });
    });
  });
});
