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
}

export default new Tools();