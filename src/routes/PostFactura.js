const { Router } = require('express');
const router= Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');
const user = require("./loginV2");
router.post('/v1/venta', async (req, res) => {

    
    if(req.body){
        
    console.log(req.body);
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