const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'contacts api',
        description: 'contacts api'
    },
    host: 'localhost:3000',
    schemes: [ 'http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);