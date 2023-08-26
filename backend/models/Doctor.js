const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    specialty: {
      type: String,
      required: true
    },
    qualifications: {
      type: [String],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    // You can add more fields as needed, such as contact information, availability, etc.
  });

module.exports = mongoose.model('Doctor', doctorSchema);