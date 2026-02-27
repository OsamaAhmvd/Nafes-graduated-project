const Doctor = require('../models/Doctor');
const User = require('../models/User');

// عرض كل الدكاترة
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ imageVerificationStatus: 'approved' })
      .populate('user', 'name email avatar');

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// عرض دكتور واحد
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate('certificates');

    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
