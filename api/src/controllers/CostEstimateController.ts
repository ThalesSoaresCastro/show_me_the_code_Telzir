import {
    Request,
    Response,
} from 'express';

import CostEstimateService from '@/services/CostEstimateService';

interface ElementCost {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
}


class CostEstimateController {
    async costPrice(req:Request, res: Response){

        const elementCost: ElementCost = <ElementCost>req.body;

        if(!elementCost.origin || !elementCost.destiny || 
            !elementCost.plan || !elementCost.time){
                return res.status(422).json({message: "Params not exists.", element:{}});
            }
        if( !elementCost.origin.trim() || !elementCost.destiny.trim() || elementCost.plan <= 0 || elementCost.time <= 0 ){
            return res.status(422).json({message: "Invalid data.", element:{}});
        }

        const result = await CostEstimateService.estimateValue(elementCost);

        if(result && !result.element){
            return res.status(400).json(result);
        }
        return res.status(200).json(result)

    }

}

export default new CostEstimateController();