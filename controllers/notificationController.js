// controllers/notificationController.js
const Notification = require('../models/Notification');

// 👁️‍🗨️ عرض كل الإشعارات للمستخدم
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ وضع إشعار كمقروء
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });

    res.status(200).json({ msg: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ➕ إنشاء إشعار جديد (يمكن استخدامه داخل أي عملية Backend)
exports.createNotification = async (userId, message) => {
  try {
    const notification = await Notification.create({ user: userId, message });
    return notification;
  } catch (err) {
    console.error('Notification error:', err.message);
  }
};
