const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de productos',
            version: '1.0',
            description: 'API ecommerce para productos de alimentos',
        },
    },
    apis: [`${__dirname}/**/**/*.yaml`],
};

const swaggerSpecs = swaggerJSDoc(options);

module.exports = { swaggerSpecs };