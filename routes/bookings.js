const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking related APIs
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               timeSlot:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', auth, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings/me:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 */
router.get('/me', auth, bookingController.getUserBookings);

/**
 * @swagger
 * /api/bookings/doctor/{doctorId}:
 *   get:
 *     summary: Get bookings for a doctor
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/doctor/:doctorId', auth, bookingController.getDoctorBookings);

module.exports = router;
