import request from 'supertest';
import app from '@/index';
import prismaCLient from '@/prisma';

interface PriceList {
    origin: string;
    destiny: string;
    price: number;
}

interface ElementCost {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
}

interface ElementResponse{
    origin: string;
    destiny: string;
    plan: number;
    time: number;
    costPlan?: number;
    costNotPlan?: number;
}

describe('Test CostEstimateController', () => {
    
    beforeAll(async()=>{
        const dataList:PriceList[] = [
            {origin: '016', destiny: '011', price: 2.90},
            {origin: '017', destiny: '011', price: 2.70},
        ];
    
        //add elements
        await prismaCLient.priceList.createMany({
            data: dataList
        });
        console.log("Data Created");
    })
    
    afterAll(async()=>{
        //delete all test data
        await prismaCLient.priceList.deleteMany();
    
        console.log("Deleted all elements.");
    
        await prismaCLient.$disconnect();
    
    });
    
    test('Param origin empty', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'  ',
            destiny: '011',
            plan:30,
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Invalid data.");
        expect(resp.body.element).toEqual({});
    });

    test('Param destiny empty', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '  ',
            plan:30,
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Invalid data.");
        expect(resp.body.element).toEqual({});
    });

    
    test('Param plan is negative', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '011',
            plan:-30,
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Invalid data.");
        expect(resp.body.element).toEqual({});
    });

    test('Param time is negative', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '011',
            plan:30,
            time:-60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Invalid data.");
        expect(resp.body.element).toEqual({});
    });


    test('Param origin not exists', async() => {
        let newElement:ElementCost = <ElementCost>{
            destiny: '011',
            plan:30,
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Params not exists.");
        expect(resp.body.element).toEqual({});
    });

    test('Param destiny not exists', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            plan:30,
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Params not exists.");
        expect(resp.body.element).toEqual({});
    });

    
    test('Param plan not exists', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '011',
            time:60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Params not exists.");
        expect(resp.body.element).toEqual({});
    });

    test('Param time not exists', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '011',
            plan:30,
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(422);
        expect(resp.body.message).toEqual("Params not exists.");
        expect(resp.body.element).toEqual({});
    });

    test('element not exists', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'020',
            destiny: '021',
            plan:30,
            time: 60
        }; 

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(400);
        expect(resp.body.message).toEqual("Error! Element not exists.");
        expect(resp.body.element).toEqual(null);
    });

    test('cost calculate', async() => {
        let newElement:ElementCost = <ElementCost>{
            origin:'016',
            destiny: '011',
            plan:30,
            time: 60
        };
        
        let elementCalculated: ElementResponse = <ElementResponse>{
            origin: '016',
            destiny: '011',
            plan: 30,
            time: 60,
            costPlan: 95.7,
            costNotPlan: 191.4
        }

        const resp = await request(app)
                            .post('/cost')
                            .send(newElement);
        
        expect(resp.statusCode).toEqual(200);
        expect(resp.body.message).toEqual("Complete costing process.");
        expect(resp.body.element).toEqual(elementCalculated);
    });
});