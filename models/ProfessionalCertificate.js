const mongoose = require('mongoose');

const ProfessionalCertificateSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  title: { type: String, required: true },
  issuingAuthority: { type: String, required: true },
  issueDate: { type: Date, required: true },
<<<<<<< HEAD
  certificateImage: { type: String, required: false },
=======
  certificateImage: { type: String, required: true },
>>>>>>> 6bd4bb9 (initial commit)
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('ProfessionalCertificate', ProfessionalCertificateSchema);
