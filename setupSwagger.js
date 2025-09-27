// src/config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./setupSwaggerOptions.js";

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("✅ Swagger docs at http://localhost:3000/api-docs");
}

export default swaggerSpec;
