const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');

router.post('/v1/register', async (req, res) => {

    const {nombre, email, mobile, password } = req.body;
    if(nombre && email && mobile && password){
        
    
    // Obtener todos los contactos de Holded con el SDK
    sdk.auth('343654e3d1014f792344a19ee8f40503');
    const { data } = await sdk.listContacts(); 
    // Buscar si el contacto ya existe

    const user = data.find((contact) => contact.email === email);

  if (!user) { // si no existe lo creamos
        sdk.createContact(
            { 
                name: nombre, 
                email: email, 
                mobile: mobile,
                socialNetworks:
                {
                    website: password
                }
            }
            )
            .then(({ data }) => {
                console.log(data);
                res.status(201).send('Contacto creado con exito👌👍');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ error: 'Error al crear el contacto' });
            });
    } else {
        res.status(409).send({ error: 'usuario previamente registrado' });
    }
}
    else{
        res.status(400).send({ error: 'faltan datos requeridos' });
    }
});
module.exports = router;