const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');

router.get('/v1/getall', async (req, res) => {

    sdk.auth('343654e3d1014f792344a19ee8f40503');
    try {

      const { data } = await sdk.listContacts();
      console.log(data);
      res.send(data); // Agrega esta línea si deseas devolver los datos al cliente
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message }); // Agrega esta línea para manejar errores
    }
  
  });




module.exports = router;