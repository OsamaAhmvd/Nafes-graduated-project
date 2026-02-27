const mongoose = require('mongoose');

const ProfessionalCertificateSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  title: { type: String, required: true },
  issuingAuthority: { type: String, required: true },
  issueDate: { type: Date, required: true },
  certificateImage: { type: String, required: false },
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('ProfessionalCertificate', ProfessionalCertificateSchema);
