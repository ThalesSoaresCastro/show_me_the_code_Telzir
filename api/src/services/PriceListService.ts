import prismaClient from "@/prisma";


interface PriceList {
    origin: string;
    destiny: string;
    price: number;
}

class PriceListService {
    async newElement(new_element: PriceList){
        //verifica se o elemento já existe no bd
        let element = await prismaClient.priceList.findFirst({
            where:{
                OR:[
                    {origin: new_element.origin},
                    {destiny: new_element.destiny}
                ]
            }
        })
        if(!element){
            element = await prismaClient.priceList.create({
                data:{
                    origin: new_element.origin,
                    destiny: new_element.destiny,
                    price: new_element.price
                }
            })

            return {'message': 'New element created.', element: element};
        }
        return {'message': 'Element already exists.', element: element};
    }

    async updateElement(update_element: PriceList, elementId: string){
        let element:PriceList | any;

        element = await prismaClient.priceList.findFirst({
            where:{
                id: elementId
            }
        });

        if(!element){
            return {'message': 'Element not exists.', element: element};
        }

        try{
            element = await prismaClient.priceList.update({
                where:{
                    id: elementId,
                },
                data:{
                    origin: update_element.origin,
                    destiny: update_element.destiny,
                    price: update_element.price
                }
            })

            return {'message': 'Success on changing element.', element: element};
        }catch(error){
            console.log('error: ', error);
        }
        return {'message': 'Error in update element.', element:element};
        

    }

    async findAllElements(){
        let elements = await prismaClient.priceList.findMany();
        if(elements.length > 0){
            return {'message': 'All elements.' , elements:elements};
        }else{
            return {'message': 'There are no registered elements.', elements: elements};
        }
    }

    async findOneElement(id: string){
        let element = await prismaClient.priceList.findFirst({
            where: {
                id: id
            }
        });
        if(element){
            return { 'message':'Element exists.', element: element };
        }
        
        return {'message': 'Element not exists', element:element };
    }

    async deleteElement(id: string){
        let element = await prismaClient.priceList.findFirst({
            where: {
                id: id
            }
        });
        if(element){
            await prismaClient.priceList.delete({
                where:{
                    id: id
                }
            })
            return {'message': 'Success on deleting element.', element: element};
        }
        return {'message': 'Element not exists', element: element};
    }

}

export default new PriceListService();