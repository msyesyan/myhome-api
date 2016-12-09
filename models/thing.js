const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThingSchema = new Schema({
  name: { type: String, required: true },
  description: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Thing', ThingSchema);
