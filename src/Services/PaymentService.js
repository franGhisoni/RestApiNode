const axios = require("axios");

class PaymentService {
    
    async createPayment(req) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    let items= [];


	//lote
	items.push({
		title: req.body.description,
		unit_price: Number(req.body.price),
		quantity: Number(req.body.quantity),
	});


	//tax
	items.push({
		title: "Tax",
		unit_price: Number((req.body.amount*0.21)),
		quantity: 1,

	})

    let preference = {
		items: items,
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",//approved, all deberia ser automatico
		// notification_url: "http://localhost:3000/feedback",
	};
	console.log(preference)

    const payment = await axios.post(url, preference, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_API_KEY}`
    }
    });

    return payment.data;
    }


async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
        "back_url": "https://www.google.com",
        "reason": "Test Subscription",
        "auto_recurring": {
            "frequency": 1,
            "frequency_type": "months",
            "start_date": "2023-06-02T13:07:14.260Z",
            "end_date": "2024-07-20T15:59:52.581Z",
            "transaction_amount": 10,
            "currency_id": "ARS"
        },
        "payer_email": "test_user_1721412825@testuser.com",
        
        "status": "authorized"
    };

    const subscription = await axios.post(url, body, {
        headers: {
        "Content-Type": "application/json",
        "X-scope": "stage",
        Authorization: `Bearer ${process.env.MP_API_KEY}`
        }
    });

        return subscription.data;
        }
}

module.exports = PaymentService;