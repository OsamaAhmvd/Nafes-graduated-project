const Doctor = require('../models/Doctor');
const { uploadToCloudinary } = require('../middleware/upload');
const Notification = require('../models/Notification');

// 👤 عرض بروفايل المستخدم
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// 🪪 رفع هوية الدكتور
exports.uploadDoctorId = async (req, res) => {
  try {
    if (req.user.personType !== 'doctor')
      return res.status(403).json({ msg: 'Only doctors can upload ID' });

    let doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) doctor = new Doctor({ user: req.user._id });

    if (req.files?.front) {
      const frontResult = await uploadToCloudinary(
        req.files.front[0].buffer,
        'doctorIds',
        `${req.user._id}-front`
      );
      doctor.idImages.front = frontResult.secure_url;
    }

    if (req.files?.back) {
      const backResult = await uploadToCloudinary(
        req.files.back[0].buffer,
        'doctorIds',
        `${req.user._id}-back`
      );
      doctor.idImages.back = backResult.secure_url;
    }

    doctor.imageVerificationStatus = 'pending';
    await doctor.save();

    // 🔔 إنشاء إشعار
    await Notification.create({
      user: req.user._id,
      message: 'Your ID has been uploaded successfully and is pending verification.'
    });

    res.status(200).json({ msg: 'ID uploaded successfully', doctor });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
