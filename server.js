// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ===============================
   Swagger Configuration
================================ */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nafes Medical Platform API",
      version: "1.0.0",
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}/api` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
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
   Root Route
================================ */
app.get('/', (req, res) => {
  res.send('API running...');
});



/* ===============================
   Start Server
================================ */
const startServer = async () => {
  await connectDB();


  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();