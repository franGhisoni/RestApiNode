const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const User = require('../models/user')

router.post('/v1/updateUser', async (req, res) => {

    const usuario = req.body;
    console.log(usuario);
    
    sdk.auth('343654e3d1014f792344a19ee8f40503');
    let { data } = await sdk.updateContact(
      {
        name: usuario.name,
        socialNetworks: {

          website: usuario.password

        },
        mobile: usuario.mobile,
        

      },
      {contactId: usuario.id});
    await console.log(data);
    
    if (data.status != 200) {
      res.status(401).send({ error: 'error del servidor' });
      return;
    }else {
      try {
        
        res.status(201).send(usuario); // Devolver la lista de productos
        

      } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message }); 
      }
    }
});

module.exports = router;