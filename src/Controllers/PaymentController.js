class PaymentController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async getPaymentLink(req, res) {
        try{
            const payment = await this.subscriptionService.createPayment(req);

            return res.json(payment); 
        } catch(error) {
            console.log("error payment controller", error);

            return res.status(500).json(
                {
                    error: true,
                    message: "Failed to create payment from controller"
                }
            );
        }
    }
    
    async getSubscriptionLink(req, res) {
        try{
            const subscription = await this.subscriptionService.createSubscription();

            return res.json(subscription);
        }catch(error) {
            console.log("error subscription controller", error);
            
            return res.status(500).json(
                {
                    error: true,
                    message: "Failed to create a new subcription."
                }
            )
        }
    }

    
}
module.exports = PaymentController;