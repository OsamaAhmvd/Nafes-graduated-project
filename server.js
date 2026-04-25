const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

/* ===============================
   DB
================================ */
connectDB().catch(console.error);

/* ===============================
   Middleware
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   Swagger
================================ */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nafes API",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }]
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/* ===============================
   Routes
================================ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));

/* ===============================
   Root
================================ */
app.get('/', (req, res) => {
  res.json({
    message: "API running 🚀",
    mongo: process.env.MONGO_URI ? "connected" : "missing"
  });
});

/* ===============================
   IMPORTANT (Vercel)
================================ */
module.exports = app;