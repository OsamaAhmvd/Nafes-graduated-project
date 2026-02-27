const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat / Messaging APIs
 */

/**
 * @swagger
 * /api/chat/create:
 *   post:
 *     summary: Create or get chat
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otherUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat object
 */
router.post('/create', auth, chatController.getOrCreateChat);

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent
 */
router.post('/send', auth, chatController.sendMessage);

/**
 * @swagger
 * /api/chat/{chatId}:
 *   get:
 *     summary: Get all messages in a chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/:chatId', auth, chatController.getMessages);

module.exports = router;
