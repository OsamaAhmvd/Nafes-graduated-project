const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, uploadDoctorId } = require('../controllers/userController');
const { uploadIdImages } = require('../middleware/upload');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User related APIs
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 */
router.get('/me', auth, getProfile);

/**
 * @swagger
 * /api/users/doctor/upload-id:
 *   post:
 *     summary: Upload doctor ID images
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               front:
 *                 type: string
 *                 format: binary
 *               back:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: ID uploaded successfully
 */
router.post('/doctor/upload-id', auth, uploadIdImages.fields([
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
]), uploadDoctorId);

module.exports = router;
