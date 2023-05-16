const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const user = require("./loginV2");
router.post('/v1/venta', async (req, res) => {
    sdk.auth('c1e86f21bcc5fdedc6c36bd30cb5b596');
    
    if(req.body){
        const fechaActual = new Date();
        const fechaUnix = Math.floor(fechaActual.getTime() / 1000);
        console.log(req.body);
        // sdk.createDocument({
        //     items: [{sku:req.body.sku}],
        //     applyContactDefaults: true,
        //     contactId: req.body.user.id,
        //     date: fechaUnix,
        //   }, {docType: 'docType'}).then(({ data }) => console.log(data)).catch(err => console.error(err));

        res.status(201).json({titulo : 'Post Facturas con exito👌👍',
                            valor: 69});
    // res.send(user.getUser);
    // console.log("se ejecuto postfact")
    // console.log(user.getUser.email);
}
    else{
        res.status(400).send({ error: 'faltan datos requeridos' });
    }
});
module.exports = router;