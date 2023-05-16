const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const {userDTO} = require('./loginV2');

router.get('/v1/getallFacturas', async (req, res) => {

sdk.auth('c1e86f21bcc5fdedc6c36bd30cb5b596');

try{

    const {data} = await sdk.listDocuments({docType: 'invoice'});

    const listaFacturas = []; // Crear una lista vacía

    for (const factura of JSON.parse(data)) {
      listaFacturas.push(factura); // Agregar cada producto a la lista
    }
const response = new Object();
response["product"]= listaFacturas[0].products[0].name;
response["total"]= listaFacturas[0].total;
// response["amount"]= listaFacturas[0].paymentsDetail[0].amount;
// response["cantFacturas"] = listaFacturas[0].paymentsDetail.length;

    res.status(201).send(data); // Devolver la lista de productos
    // res.status(201).send(listaFacturas[0].products[0].name);
    console.log(userDTO); // Acceder al objeto userDTO
    console.log(userDTO.name); // Acceder a una propiedad específica de
}catch (error){
    console.log(error);
    res.status(500)
}

});


module.exports = router; 