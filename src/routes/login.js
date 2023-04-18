

const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');

router.get('/v1/login', async (req, res) => {

    const { email, password } = req.query;

    // Obtener todos los contactos de Holded con el SDK
    sdk.auth('343654e3d1014f792344a19ee8f40503');
    const { data } = await sdk.listContacts();
  
    // Buscar el contacto que coincide con el correo electrónico y la contraseña proporcionados
    const user = data.find((contact) => contact.email === email && contact.notes[0].description === password);
    if (!user) {
      res.status(401).send({ error: 'Credenciales inválidas' });
      return;
    }
  
    res.send(user); // Devolver el usuario encontrado como respuesta
  });




module.exports = router;