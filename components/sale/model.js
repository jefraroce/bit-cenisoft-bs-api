const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, required: true, ref: 'books' },
  name: { type: String, required: true },
  unitValue: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 }
})

const saleSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, required: true, ref: 'clients' },
  details: {
    type: [detailSchema],
    required: false,
    validate: {
      validator: (val) => {
        return Array.isArray(val) && val.length > 0
      },
      message: props => 'Sale must have at least one detail!'
    }
  },
  total: { type: Number, required: true, min: 0 },
  date: { type: Date, required: false }
}, {
  timestamps: true
})

const Sale = mongoose.model('sales', saleSchema)

module.exports = Sale
