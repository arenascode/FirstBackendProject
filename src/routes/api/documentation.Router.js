import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const routerDocs = Router()

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce BE project Documented",
      description: "Ecommerce App made with NodeJs & Express",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

routerDocs.use('/',swaggerUi.serve, swaggerUi.setup(specs))