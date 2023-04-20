

const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');

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

      let { data } = await sdk.listProducts();

      const listaProductos = []; // Crear una lista vacía
      let productsOwn=[];

      for (const producto of data) {
        listaProductos.push(producto); // Agregar cada producto a la lista
        if(producto.contactId.$oid=== user.id){
            productsOwn.push(producto.name);
        }
      }
      user.productos = productsOwn; 
    //   console.log(user);

    let userDTO = new Object();

    userDTO["name"]= user.name;
    userDTO["email"]= user.email;
    userDTO["mobile"]= user.mobile;
    userDTO["id"]= user.id;
    userDTO["productos"]= productsOwn;
    console.log("user DTO:")
    console.log(userDTO);
      res.status(201).send(userDTO); // Devolver la lista de productos
      


    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message }); 
    }
    
    


  
    


}
  });




module.exports = router;