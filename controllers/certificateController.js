const ProfessionalCertificate = require('../models/ProfessionalCertificate');
const Doctor = require('../models/Doctor');
<<<<<<< HEAD
const { createNotification } = require('./notificationController');
=======
>>>>>>> 6bd4bb9 (initial commit)

exports.uploadCertificate = async (req, res) => {
  try {
    const { doctorId, title, issuingAuthority, issueDate } = req.body;
    if (!req.file) return res.status(400).json({ msg: 'Certificate image required' });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    const cert = await ProfessionalCertificate.create({
      doctor: doctorId,
      title,
      issuingAuthority,
      issueDate,
      certificateImage: req.file.path
    });

<<<<<<< HEAD
    // 🔔 إنشاء إشعار
    await createNotification(doctor.user, `Your certificate "${title}" has been uploaded successfully.`);

=======
>>>>>>> 6bd4bb9 (initial commit)
    res.status(201).json({ msg: 'Certificate uploaded', certificate: cert });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
