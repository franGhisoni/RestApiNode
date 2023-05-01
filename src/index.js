const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan')

// Configuración del puerto
const PORT = 8080;

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extebded: false}));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/test'));
//POST
app.use(require('./routes/PostFactura'));
app.use(require('./routes/Register'));
//GET
app.use(require('./routes/getAll'));//contactos
app.use(require('./routes/login'));
app.use(require('./routes/loginV2'));
app.use(require('./routes/getAllProducto'));
app.use(require('./routes/getAllFacturas'));

//starting
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// Manejo de error si el puerto ya está en uso
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    console.log(`Port ${PORT} is already in use. Using next available port...`);

    // Iniciar el servidor en el puerto 3001
    const nextServer = app.listen(3001, () => {
        const nextPort = nextServer.address().port;
        console.log(`Server listening on port ${nextPort}`);
    });
});
