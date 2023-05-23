const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const User = require('../models/user')

router.get('/v2/login', async (req, res) => {

    const { email, password } = req.query;

    // Obtener todos los contactos de Holded con el SDK
    sdk.auth('343654e3d1014f792344a19ee8f40503');
    let { data } = await sdk.listContacts();
  
    // Buscar el contacto que coincide con el correo electrónico y la contraseña proporcionados
    const user = data.find((contact) => contact.email === email && contact.notes[0].description === password);
    if (!user) {
      res.status(401).send({ error: 'Credenciales inválidas' });
      return;
    }else {
      try {
        let { data } = await sdk.listDocuments({docType: 'invoice'});
        const listaProductos = []; // Crear una lista vacía de FACTURAS 
        let productsOwn=[];
        let servicesOwn = [];
        console.log("data[0]")
        console.log(JSON.parse(data))
        console.log("fin de data[0]")

        for (const factura of JSON.parse(data)) {
          listaProductos.push(factura); // Agregar cada producto a la lista

          if (factura.contact === user.id) {
            factura.products.forEach((product) => {
              if (product.serviceId) {
                servicesOwn.push(product);
              } else {
                productsOwn.push(product.name);
              }
              });
          }
        }
        
        console.log("productsOwn");
        console.log(productsOwn);
        // console.log("listaProductos");
        // console.log(listaProductos);

        let userDTO = new Object();
        userDTO["name"]= user.name;
        userDTO["email"]= user.email;
        userDTO["mobile"]= user.mobile;
        userDTO["id"]= user.id;
        userDTO["productos"]= productsOwn;
        userDTO['password']=user.notes[0].description
        userDTO['servicios']=servicesOwn;

        console.log("user DTO:")
        console.log(userDTO);

        res.status(201).send(userDTO); // Devolver la lista de productos
        module.exports = { router, userDTO };

      } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message }); 
      }
    }
});

module.exports = router;