import PriceListService from "@/services/PriceListService";

import { prismaMock } from "@/SingletonMock";


interface PriceListElementMock {
    id: string;
    origin: string;
    destiny: string;
    price: number;
    create_at: Date | any;
}

interface PriceListType {
    origin: string;
    destiny: string;
    price: number;
}

describe('Test PriceListService', ()=>{
    afterAll(async()=>{
        await prismaMock.priceList.deleteMany();    
        console.log("Deleted all elements.");
    });

    describe('Create New Element',()=>{
        test('New Element Add', async()=>{

            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            //mock criando elemento no banco...
            prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.newElement(elementCreatedTest);
            let objResult = {
                origin:result.element.origin,
                destiny:result.element.destiny,
                price:result.element.price
            }

            
            expect(result.element).toHaveProperty("id");
            expect(objResult).toEqual({
                origin:"011",
                destiny: "017",
                price:1.23
            });
            expect(result.message).toEqual('New element created.');
        
        });
        test('Element Exists', async()=>{

            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            //mock criando elemento no banco...
            prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.newElement(elementCreatedTest);
            let objResult = {
                origin:result.element.origin,
                destiny:result.element.destiny,
                price:result.element.price
            }

            expect(objResult).toEqual({
                origin:"011",
                destiny: "017",
                price:1.23
            });

            expect(result.message).toEqual('Element already exists.');
        
        });

    });

    describe('Update Element', ()=>{
        test('Element not exists', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            const elementUpdate:PriceListType = {
                origin: "011",
                destiny: "017",
                price: 2.21
            }

            //mock criando elemento no banco...
            prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.updateElement(elementUpdate, "18908a28-7e9f-4a6d-9617-8a4554b45e4v");

            expect(result.message).toEqual('Element not exists.');
            expect(result.element).toEqual(null);

        });

        test('Element Update', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            const elementUpdate:PriceListType = {
                origin: "011",
                destiny: "017",
                price: 2.21
            }

            //mock criando elemento no banco...
            await prismaMock.priceList.update.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.updateElement(elementUpdate, 
                `${await (await PriceListService.findAllElements()).elements.pop()?.id}`);

            let objResult = {
                origin:result.element.origin,
                destiny:result.element.destiny,
                price:result.element.price
            }
    
            expect(result.message).toEqual('Success on changing element.');
            expect(objResult).toEqual(elementUpdate);
        });
    });

    describe('Find all Element', () => {

        test('All elements returned', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            //mock criando elemento no banco...
            await prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.findAllElements();

    
            expect(result.message).toEqual('All elements.');
            expect( (result.elements.length > 0) ).toEqual(true);
        });
        
    });

    describe('Find One Element', () =>{
        test('Element returned', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            const elementOne:PriceListType = {
                origin: "011",
                destiny: "017",
                price: 2.21
            }

            //mock criando elemento no banco...
            await prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.findOneElement(
                `${await (await PriceListService.findAllElements()).elements.pop()?.id}`);

            let objResult;

            if(result.element){
                objResult = {
                    origin:result.element.origin,
                    destiny:result.element.destiny,
                    price:result.element.price
                }
            }
    
            expect(result.message).toEqual('Element exists.');
            expect(objResult).toEqual(elementOne);
        });
        test('Element not exists', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            //mock criando elemento no banco...
            await prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.findOneElement("18908a28-7e9f-4a6d-9617-8a4554b45e1e");
    
            expect(result.message).toEqual('Element not exists');
            expect(result.element).toEqual(null);
        });
    });

    describe('Delete Element', ()=>{
        test('Element not exists', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            const elementCreated:PriceListType = {
                origin: "011",
                destiny: "017",
                price: 2.21
            }

            //mock criando elemento no banco...
            prismaMock.priceList.create.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.deleteElement("18908a28-7e9f-4a6d-9617-8a4554b45e4v");

            expect(result.message).toEqual('Element not exists');
            expect(result.element).toEqual(null);

        });

        test('Element Deleted', async()=>{
            const elementCreatedTest:PriceListElementMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                origin: "011",
                destiny: "017",
                price: 1.23,
                create_at: "2022-01-01T18:07:00.878Z"
            }

            const elementCreated:PriceListType = {
                origin: "011",
                destiny: "017",
                price: 2.21
            }

            //mock criando elemento no banco...
            await prismaMock.priceList.update.mockResolvedValue(elementCreatedTest);

            let result = await PriceListService.deleteElement( 
                `${await (await PriceListService.findAllElements()).elements.pop()?.id}`);

            let objResult;
            if(result.element){
                objResult = {
                    origin:result.element.origin,
                    destiny:result.element.destiny,
                    price:result.element.price
                }
            }
    
            expect(result.message).toEqual('Success on deleting element.');
            expect(objResult).toEqual(elementCreated);
        });

    });

});