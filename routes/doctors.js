const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor related APIs
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all approved doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get('/', doctorController.getAllDoctors);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor info
 */
router.get('/:id', doctorController.getDoctorById);

module.exports = router;
