import {
    Request,
    Response,
} from 'express';


import PriceListService from "@services/PriceListService";

interface PriceList {
    origin: string;
    destiny: string;
    price: number;
}


class PriceListController {
    public async CreateNewElement(req: Request, res: Response){
        const element: PriceList = <PriceList>req.body;

        if( !element.origin || !element.destiny || !element.price){
            return res.status(422).json({message: "Param not exists.", element:{} });
        }

        if( !element.origin.trim() || !element.destiny.trim() || element.price <= 0){
            return res.status(422).json({message: "Invalid data.", element:{}});
        }
        
        const result = await PriceListService.newElement(element);

        if(result.message === "Element already exists."){
            return res.status(400).json(result);
        }
        return res.status(201).json(result);

    }
    async UpdateElement(req: Request, res: Response){
        const element: PriceList = <PriceList>req.body;

        if( !element.origin || !element.destiny || !element.price){
            return res.status(422).json({message: "Param not exists.", element:{}});
        }

        if( !element.origin.trim() || !element.destiny.trim() || element.price <= 0){
            return res.status(422).json({message: "Invalid data.", element:{}});
        }

        const id = req.params.id;
        const result = await PriceListService.updateElement(element, id);

        if(result && !result.element){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);


    }
    async DeleteElement(req: Request, res: Response){
        const id = req.params.id;

        if(!id){
            return res.status(422).json({message: "ID not exists.", element: {}});
        }

        if(!id.trim()){
            return res.status(422).json({message: "Id empty.", element: {}});
        }

        const result = await PriceListService.deleteElement(id);

        if(!result.element){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
    async FindAllElements(req: Request, res: Response){

        const result = await PriceListService.findAllElements();

        if(!result.elements){
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    }
    async FindOneElement(req: Request, res: Response){
        const id = req.params.id;

        if(!id){
            return res.status(422).json({message: "ID not exists.", element: {}});
        }

        const result = await PriceListService.findOneElement(id);

        if(!result.element){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }

}

export default new PriceListController();