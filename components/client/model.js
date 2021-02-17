const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PROJECTION = ['name', 'address', 'mobile', 'email', 'createdAt', 'updatedAt']

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

clientSchema.plugin(uniqueValidator)

const Client = mongoose.model('clients', clientSchema)

module.exports = { Client, PROJECTION }
