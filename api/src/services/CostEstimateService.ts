import prismaClient from "@/prisma";
import tools from "@/tools/tools";

interface ElementCost {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
}

interface PriceList {
    origin: string;
    destiny: string;
    price: number;
}

interface NewElementResponse{
    origin: string;
    destiny: string;
    plan: number;
    time: number;
    costPlan?: number;
    costNotPlan?: number;
}

class CostEstimateService{
    async estimateValue(elementCost: ElementCost){

        //procura elemento
        let element:PriceList | any = await prismaClient.priceList.findFirst({
            where:{
                AND:[
                    {origin : elementCost.origin},
                    {destiny: elementCost.destiny}
                ]
            }
        })

        //elemento não existe
        if (!element){
            return {'message':'Error! Element not exists.', element: element};
        }


        //calculando tempo excedente
        let diff:number | any = await tools.excedentTime(elementCost.time, elementCost.plan);

        //calculando custo com algum plano ativo...
        const costPlan: number | any = await tools.excedentPrice(element.price, diff);

        //calculando custo sem plano
        const costNotPlan: number | any = await tools.excedentPrice(element.price, elementCost.time);

        const responseElement:NewElementResponse = {
            origin: elementCost.origin,
            destiny: elementCost.destiny,
            plan: elementCost.plan,
            time: elementCost.time,
            costPlan: costPlan,
            costNotPlan: costNotPlan 
        };

        return {"message":"Complete costing process.", element: responseElement};

    }

}

export default new CostEstimateService();