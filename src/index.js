const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan')
// const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');


//config
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extebded: false}));
app.use(express.json());
app.use(cors());


//routes
app.use(require('./routes/test'));
app.use(require('./routes/getAll'));
app.use(require('./routes/login'));

//starting
app.listen(app.get('port'), () => { 
    console.log(`server on port ${app.get('port')}`);
});
