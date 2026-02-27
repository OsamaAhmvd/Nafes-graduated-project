const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const Doctor = require('../models/Doctor');
const ProfessionalCertificate = require('../models/ProfessionalCertificate');
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin only APIs
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

/**
 * @swagger
 * /api/admin/certificates/pending:
 *   get:
 *     summary: Get all pending certificates
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending certificates
 */
router.get('/certificates/pending', auth, adminOnly, async (req, res) => {
  const certificates = await ProfessionalCertificate.find({ status: 'pending' }).populate('doctor');
  res.json(certificates);
});

/**
 * @swagger
 * /api/admin/certificate/{id}/approve:
 *   put:
 *     summary: Approve a certificate
 *     tags: [Admin]
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
 *         description: Certificate approved
 */
router.put('/certificate/:id/approve', auth, adminOnly, async (req, res) => {
  const cert = await ProfessionalCertificate.findById(req.params.id);
  if (!cert) return res.status(404).json({ msg: 'Certificate not found' });

  cert.status = 'approved';
  await cert.save();

  res.json({ msg: 'Certificate approved', certificate: cert });
});

/**
 * @swagger
 * /api/admin/certificate/{id}/reject:
 *   put:
 *     summary: Reject a certificate
 *     tags: [Admin]
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
 *         description: Certificate rejected
 */
router.put('/certificate/:id/reject', auth, adminOnly, async (req, res) => {
  const cert = await ProfessionalCertificate.findById(req.params.id);
  if (!cert) return res.status(404).json({ msg: 'Certificate not found' });

  cert.status = 'rejected';
  await cert.save();

  res.json({ msg: 'Certificate rejected', certificate: cert });
});

/**
 * @swagger
 * /api/admin/doctors/pending:
 *   get:
 *     summary: Get all pending doctor verifications
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending doctors
 */
router.get('/doctors/pending', auth, adminOnly, async (req, res) => {
  const doctors = await Doctor.find({ imageVerificationStatus: 'pending' }).populate('user');
  res.json(doctors);
});

/**
 * @swagger
 * /api/admin/doctor/{id}/approve:
 *   put:
 *     summary: Approve doctor verification
 *     tags: [Admin]
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
 *         description: Doctor approved
 */
router.put('/doctor/:id/approve', auth, adminOnly, async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

  doctor.imageVerificationStatus = 'approved';
  await doctor.save();

  res.json({ msg: 'Doctor approved', doctor });
});

/**
 * @swagger
 * /api/admin/doctor/{id}/reject:
 *   put:
 *     summary: Reject doctor verification
 *     tags: [Admin]
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
 *         description: Doctor rejected
 */
router.put('/doctor/:id/reject', auth, adminOnly, async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

  doctor.imageVerificationStatus = 'rejected';
  await doctor.save();

  res.json({ msg: 'Doctor rejected', doctor });
});

module.exports = router;
