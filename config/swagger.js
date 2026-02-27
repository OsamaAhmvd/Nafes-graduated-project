const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nafes API",
      version: "1.0.0",
      description: "Medical Platform API Documentation"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };