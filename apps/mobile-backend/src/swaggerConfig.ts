import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for Express.js project",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server URL
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
