class FunnelController {
    constructor(funnelService){
        this.funnelService = funnelService;
    }

    async getFunnel(){
        try{
            const funnel = await this.funnelService.getFunnel();

            return funnel;
        }catch(error){
            console.log("error funnel controller", error);
            return error;
        }
    }

    
}