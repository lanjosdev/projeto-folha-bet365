import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cadastro de Máquinas',
      version: '1.0.0',
      description: 'API REST para cadastro e listagem de máquinas.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.routes.ts'], // Aponta para os arquivos que terão os comentários JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);
