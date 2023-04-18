const { Router } = require('express');
const router= Router();

router.get('/v1/test',(req,res)=> {
    const data= {
        "contacto1":{
        "name": "Test",
        "pass": "word"
            },
        "contacto2":{
        "name": "Test",
        "pass": "word"
            }
    };
    res.json({data});
    
});

router.post('/v1/test',(req,res)=> {
    console.log(req.body);
    res.send('👌👍')
}
);



module.exports = router;