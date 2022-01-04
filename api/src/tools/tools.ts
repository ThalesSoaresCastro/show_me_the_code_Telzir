class Tools {
    async excedentPrice(minutePrice:number, time: number):Promise<number | null>{
        //add 10% in minuteprice
        if( time < 0 || minutePrice < 0 ) return null;

        let priceResult = (time * minutePrice) * 1.1;
        return Number(priceResult.toFixed(2));
    }
    /*
        30 min
        60 min
        120 min
    */
    async excedentTime(time:number, plan:number):Promise<number | null>{
        if(time-plan < 0){
            return null;
        }
        if(time-plan === 0){
            return 1;
        }

        else{
            return (time-plan);
        }
    }

    async validation_email (email:string):Promise<Boolean> {
        if (email.length > 320) return false;
    
        // todo email deve ter @ e . no seu endereço
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) return false;
    
        const emailRegex =
            /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    
        if (!emailRegex.test(email)) return false;
    
        const [local, domain] = email.split('@');
    
        if (local.length > 64 || local.length === 0) return false;
    
        if (domain.length > 64 || domain.length === 0) return false;
        
        return true;
    }
}

export default new Tools();