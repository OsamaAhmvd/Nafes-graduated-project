const Booking = require('../models/Booking');

// حجز موعد
exports.createBooking = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const userId = req.user._id;

    const booking = await Booking.create({
      user: userId,
      doctor: doctorId,
      date,
      timeSlot
    });

    res.status(201).json({ msg: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// عرض مواعيد المستخدم
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('doctor', 'user specialization sessionPrice')
      .populate('user', 'name email');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// عرض مواعيد الدكتور
exports.getDoctorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ doctor: req.params.doctorId })
      .populate('user', 'name email')
      .populate('doctor', 'user specialization');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
