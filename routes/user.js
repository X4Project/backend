const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   summary: API to manage users in the system
 * definitions:
 *   AuthRequest:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   RegisterRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log into the admin system
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: authRequest
 *         description: Username and password
 *         schema:
 *           $ref: '#/definitions/AuthRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Create new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: registerRequest
 *         description: User information to create
 *         schema:
 *           $ref: '#/definitions/RegisterRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', auth, register);

module.exports = router;
