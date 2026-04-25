const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
<<<<<<< HEAD
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  specialization: { type: String },
  bio: { type: String },
  experience: { type: Number },
  sessionPrice: { type: Number },

  rating: { type: Number, default: 0 },

  idImages: { 
    front: String, 
    back: String 
  },

  imageVerificationStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },

  certificates: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ProfessionalCertificate' }
  ]

=======
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idImages: { front: String, back: String },
  imageVerificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProfessionalCertificate' }]
>>>>>>> 6bd4bb9 (initial commit)
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
