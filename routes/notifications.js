const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications for logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/', auth, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
});

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.put('/:id/read', auth, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  notification.read = true;
  await notification.save();
  res.json({ msg: 'Notification marked as read', notification });
});

module.exports = router;
