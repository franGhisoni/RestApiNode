//MercadoPago.js
const { Router } = require('express');
const router= Router();
const mercadopago = require("mercadopago");
const PaymentController = require('../controllers/PaymentController');
const PaymentService = require('../services/PaymentService');


const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);


router.get('/v1/mercadoPago',(req, res, next) => {
paymentController.getPaymentLink(req, res);
}
);
module.exports = router;






// // Agrega credenciales
// mercadopago.configure({
//     access_token: "TEST-6453243717102029-050120-8e42db516068f5814f7146cefe6696b4-1362723906",
// });


//     router.post("/create_preference", (req, res) => {

//         let preference = {
//             items: [
//                 {
//                     title: "qf-test",//req.body.description,
//                     unit_price: 101,//Number(req.body.price),
//                     quantity: 1,//Number(req.body.quantity),
//                 }
//             ],
//             back_urls: {
//                 "success": "http://localhost:8080/feedback",
//                 "failure": "http://localhost:8080/feedback",
//                 "pending": "http://localhost:8080/feedback"
//             },
//             auto_return: "approved",
//         };
    
//         mercadopago.preferences.create(preference)
//             .then(function (response) {
//                 res.json({
//                     id: response.body.id,
//                     response: response
//                 });
//             }).catch(function (error) {
//                 console.log(error);
//             });
//     });
//     module.exports = router;
