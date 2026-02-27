const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const auth = require('../middleware/auth');
const { certificateUpload } = require('../middleware/upload');

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Certificate related APIs
 */

/**
 * @swagger
 * /api/certificates/upload:
 *   post:
 *     summary: Upload a professional certificate
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               title:
 *                 type: string
 *               issuingAuthority:
 *                 type: string
 *               issueDate:
 *                 type: string
 *                 format: date
 *               certificateImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Certificate uploaded
 */
router.post('/upload', auth, certificateUpload.single('certificateImage'), certificateController.uploadCertificate);

module.exports = router;
