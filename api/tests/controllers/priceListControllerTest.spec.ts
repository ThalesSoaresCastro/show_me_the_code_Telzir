import prismaCLient from '@/prisma';
import request from 'supertest';
import app from '@/index';
import UserCreateTools from "@tools/UserCreateTools";


interface PriceList {
    origin: string;
    destiny: string;
    price: number;
}

interface ILoginUser {
    email: string;
    password: string;
}

interface IUserCreated {
    id: string;
    nome: string;
    email: string;
    created_at: Date;
}

interface IUserAuthResponse {
    user:IUserCreated;
    token:string;
};

let userCreatedAuthTest:IUserAuthResponse;

describe('Test PriceListController',()=>{
    afterAll(async()=>{
        //delete all test data
        await prismaCLient.priceList.deleteMany();
        console.log("Deleted all elements.");
    
        await prismaCLient.user.deleteMany();
        console.log("Deleted all users.");
        
        await prismaCLient.$disconnect();
    });

    beforeAll(async()=>{
        //criando usuário...
        await UserCreateTools.createUserTest();

        //fazendo autenticação do usuário criado para obter o token
        userCreatedAuthTest = await UserCreateTools.authUserTest();    
        console.log('User created and auth');
    });

    describe('Insert new element', ()=>{
        test('Param origin empty', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'',
                destiny: '011',
                price: 1.2
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param destiny empty', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '',
                price: 1.2
            }; 

            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price is zero', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '017',
                price: 0
            }; 

            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price is negative', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '017',
                price: -2.2
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param origin not exists', async() => {
            let newElement:PriceList = <PriceList>{
                destiny: '011',
                price: 1.2
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });
        
        test('Param destiny not exists', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                price: 1.2
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price not exists', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                destiny: '017'
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Element created', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                destiny: '017',
                price: 1.2
            }; 

            //add element
            const resp = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            let objResult = {
                origin:resp.body.element.origin,
                destiny:resp.body.element.destiny,
                price:resp.body.element.price
            }                    
            
            expect(resp.statusCode).toEqual(201);
            expect(resp.body.message).toEqual('New element created.');
            expect(objResult).toEqual(newElement);
            
        });

        test('Element exists, not created', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                destiny: '017',
                price: 1.2
            }; 

            const respOne = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            

            const respExists = await request(app)
                            .post('/addelement')
                            .send(newElement)
                            .auth(userCreatedAuthTest.token, {type: 'bearer'});
            

            let objResult = {
                origin:respExists.body.element.origin,
                destiny:respExists.body.element.destiny,
                price:respExists.body.element.price
            }                    
            
            expect(respExists.statusCode).toEqual(400);
            expect(respExists.body.message).toEqual('Element already exists.');
            expect(objResult).toEqual(newElement);
            
        });


    });

    describe('Update element', ()=>{

        const id:string = 'dasdw212da';

        test('Param origin empty', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'',
                destiny: '011',
                price: 1.2
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param destiny empty', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '',
                price: 1.2
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price is zero', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '017',
                price: 0
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price is negative', async() => {
            let newElement:PriceList = <PriceList>{
                origin:'011',
                destiny: '017',
                price: -2.2
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param origin not exists', async() => {
            let newElement:PriceList = <PriceList>{
                destiny: '011',
                price: 1.2
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });
        
        test('Param destiny not exists', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                price: 1.2
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Param price not exists', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '011',
                destiny: '017'
            }; 

            const resp = await request(app)
                                .put(`/updateelement/${id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
            
        });

        test('Element updated', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '012',
                destiny: '013',
                price: 1.2
            }; 

            //add Element
            const respadd = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            let elementCreated = respadd.body.element;

            //add 2 in price of newElement and update element...
            newElement.price+=2;

            const resp = await request(app)
                                .put(`/updateelement/${elementCreated.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});

            let objResult = {
                origin:resp.body.element.origin,
                destiny:resp.body.element.destiny,
                price:resp.body.element.price
            }                    
            
            expect(resp.statusCode).toEqual(200);
            expect(resp.body.message).toEqual('Success on changing element.');
            expect(objResult).toEqual(newElement);
            
        });
        test('Element not exists.', async() => {
            //Deleted Element
            let newElement:PriceList = <PriceList>{
                origin: '012',
                destiny: '013',
                price: 1.2
            }; 
            const resp = await request(app)
                                .put("/updateelement/er12weqwe")
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
                  
            
            expect(resp.statusCode).toEqual(400);
            expect(resp.body.message).toEqual('Element not exists.');
            expect(resp.body.element).toEqual(null);
            
        });

    });

    describe('Delete element', () =>{

        test('Element not exists.', async() => {
            //Deleted Element
            const resp = await request(app)
                                .delete("/deleteelement/er12weqwe")
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
                  
            
            expect(resp.statusCode).toEqual(400);
            expect(resp.body.message).toEqual('Element not exists');
            expect(resp.body.element).toEqual(null);
            
        });

        test('Element deleted', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '013',
                destiny: '014',
                price: 1.2
            }; 

            //add Element
            const respadd = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            let elementCreated = respadd.body.element;

            //Deleted Element
            const resp = await request(app)
                                .delete(`/deleteelement/${elementCreated.id}`)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});

            let objResult = {
                origin:resp.body.element.origin,
                destiny:resp.body.element.destiny,
                price:resp.body.element.price
            }                    
            
            expect(resp.statusCode).toEqual(200);
            expect(resp.body.message).toEqual('Success on deleting element.');
            expect(objResult).toEqual(newElement);
            
        });

    });

    describe('Find One element', () =>{

        test('Element not exists.', async() => {
            //Deleted Element
            const resp = await request(app)
                                .get("/oneelement/er12weqwe");
                  
            
            expect(resp.statusCode).toEqual(400);
            expect(resp.body.message).toEqual('Element not exists');
            expect(resp.body.element).toEqual(null);
            
        });

        test('Element Find', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '013',
                destiny: '014',
                price: 1.2
            }; 

            //add Element
            const respadd = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            let elementCreated = respadd.body.element;

            //Deleted Element
            const resp = await request(app)
                                .get(`/oneelement/${elementCreated.id}`);

            let objResult = {
                origin:resp.body.element.origin,
                destiny:resp.body.element.destiny,
                price:resp.body.element.price
            }                    
            
            expect(resp.statusCode).toEqual(200);
            expect(resp.body.message).toEqual('Element exists.');
            expect(objResult).toEqual(newElement);
            
        });

    });

    describe('Find all element', () =>{
        test('Elements find all', async() => {
            let newElement:PriceList = <PriceList>{
                origin: '015',
                destiny: '016',
                price: 1.2
            }; 

            //add Element
            const respadd = await request(app)
                                .post('/addelement')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            

            //All Elements
            const resp = await request(app)
                                .get("/allelements");
                                //.auth(, {type: 'bearer'});

            expect(resp.statusCode).toEqual(200);
            expect(resp.body.message).toEqual('All elements.');
            expect((resp.body.elements.length > 0)).toEqual(true);
            
        });
    });

});