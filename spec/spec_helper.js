module.exports = function() {
  this.ENV = 'test';
  this.chai = require('chai');
  this.chaiHttp = require('chai-http');
  this.should = this.chai.should();
  this.server = require('../server');
};
