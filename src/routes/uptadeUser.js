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
        iban: usuario.fechaNac,
        swift: usuario.genero,
        defaults:{
          language: usuario.lang,
        },
        billAddress: {
          address: usuario.address.address_components && usuario.address.address_components[1] ? usuario.address.address_components[1].long_name + ' ' + usuario.address.address_components[0].long_name : usuario.address.address,
          city: usuario.address.address_components && usuario.address.address_components[3] ? usuario.address.address_components[3].long_name : usuario.address.city,
          postalCode: usuario.address.address_components && usuario.address.address_components[6] ? usuario.address.address_components[6].long_name : usuario.address.postalCode,
          province: usuario.address.address_components && usuario.address.address_components[4] ? usuario.address.address_components[4].long_name : usuario.address.province,
          country: usuario.address.address_components && usuario.address.address_components[5] ? usuario.address.address_components[5].long_name : usuario.address.country
          
        },


      },
      {contactId: usuario.id});
    await console.log(data);
    

      try {
        
        res.status(201).send(usuario); // Devolver usuario actaulizadop
        

      } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message }); 
      }
    }
);

module.exports = router;

// billAddress: {
//   address: usuario.address.address_components[1].long_name + ' ' + usuario.address.address_components[0].long_name  ,
//   city: usuario.address.address_components[3].long_name,
//   postalCode: usuario.address.address_components[6].long_name,
//   province: usuario.address.address_components[4].long_name,
//   country: usuario.address.address_components[5].long_name
// },