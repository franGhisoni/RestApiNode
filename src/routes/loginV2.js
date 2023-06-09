const { Router } = require('express');
const router = Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const User = require('../models/user');

router.get('/v2/login', async (req, res) => {
  const { email, password } = req.query;

  // Obtener todos los contactos de Holded con el SDK
  sdk.auth('343654e3d1014f792344a19ee8f40503');
  let { data } = await sdk.listContacts();

  // Buscar el contacto que coincide con el correo electrónico y la contraseña proporcionados
  const user = data.find(
    (contact) => contact.email === email && String(contact.socialNetworks?.website) === String(password)
  );

  if (!user) {
    res.status(401).send({ error: 'Credenciales inválidas' });
    return;
  } else {
    try {
      let { data } = await sdk.listDocuments({ docType: 'invoice' });
      const listaProductos = []; // Crear una lista vacía de FACTURAS
      let productsOwn = [];
      let servicesOwn = [];
      let facturas = [];
      let ordenesCompras = [];
      for (const factura of JSON.parse(data)) {
        listaProductos.push(factura); // Agregar cada producto a la lista

        if (factura.contact === user.id) {
          facturas.push(factura);
          factura.products.forEach((product) => {
            if (product.serviceId) {
              servicesOwn.push(product);
            } else {
              productsOwn.push(product.name);
            }
          })
              
            ordenesCompras = await sdk.listDocuments({docType: 'purchaseorder'}).then( listPurchaseOrders => {
              console.log('then: \n\n',JSON.parse(listPurchaseOrders.data).filter(purchaseOrden => purchaseOrden.contact === user.id), '\n\n\n');
              return JSON.parse(listPurchaseOrders.data).filter(purchaseOrden => purchaseOrden.contact === user.id)
              //.map(purchaseOrden => purchaseOrden.id);  
              //  podes descomentar eso si queres solo el id
            });
              
          
        }
      }

      let userDTO = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        id: user.id,
        productos: productsOwn,
        password: String(user.socialNetworks?.website),
        servicios: servicesOwn,
        facturas: facturas,
        ordenesCompra: ordenesCompras,
        fechaNac: user.iban,
        genero: user.swift,
        lang: user.defaults.language,
        address: user.billAddress
      };

      res.status(201).send(userDTO); // Devolver la lista de productos
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }
});

module.exports = router;
