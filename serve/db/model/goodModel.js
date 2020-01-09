const mongoose = require('mongoose')
let goodSchema = mongoose.Schema({
  title:{ type: String, require: true},
  name:{ type: String, require: true}
})

let goodModel = mongoose.model('ribao',goodSchema)
module.exports = goodModel