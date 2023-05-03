const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const user = require("./loginV2");

router.post('/v1/factura', async (req, res) => {

    const {nombre, email, mobile, password } = req.body;
    if(true){
        
    
    res.send(user.getUser);
    console.log("se ejecuto postfact")
    console.log(user.getUser.email);
}
    else{
        res.status(400).send({ error: 'faltan datos requeridos' });
    }
});
module.exports = router;