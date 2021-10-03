const moongose = require('mongoose')
const schema = moongose.Schema

const linkSchema = new moongose.Schema({
  url: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  nombre_original: {
    type: String,
    required: true,
  },
  descargas: {
    type: Number,
    default: 1,
  },
  autor: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = moongose.model('Links', linkSchema)
