import request from 'supertest';
import app from '@/index';
import prismaCLient from '@/prisma';
import UserCreateTools from "@tools/UserCreateTools";

interface IUser{
    nome: string;
    email: string;
    password:string;
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

describe('Test UserController', ()=>{

    afterAll(async() =>{
        await prismaCLient.user.deleteMany();
        console.log('Deleted all users');
        await prismaCLient.$disconnect();
    });

    beforeAll(async()=>{
        //criando usuário...
        await UserCreateTools.createUserTest();

        //fazendo autenticação do usuário criado para obter o token
        userCreatedAuthTest = await UserCreateTools.authUserTest();    
        console.log('User created and auth');
    });

    describe('Create new user',()=>{

        test('Param nome not exits', async() => {
            let newElement:IUser = <IUser>{
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });


        test('Param email not exits', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        
        test('Param password not exits', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param nome empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"     ",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param email empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"     ",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });
       
        test('Param password empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"  "
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param email invalid', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(400);
        });

        test('User exists', async() => {
            let newElement:IUser = <IUser>{
                nome:"teste",
                email:"teste@mail.com",
                password:"password"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(400);
        });

        test('User created', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(201);
            expect({email: resp.body.user.email, nome: resp.body.user.nome})
                .toEqual({email: newElement.email, nome: newElement.nome});
        });
    });

    describe('Update user',()=>{

        test('Param nome not exits', async() => {
            let newElement:IUser = <IUser>{
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });


        test('Param email not exits', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        
        test('Param password not exits', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param nome empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"     ",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param email empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"     ",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });
       
        test('Param password empty', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"  "
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(422);
        });

        test('Param email invalid', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put(`/updateuser/${userCreatedAuthTest.user.id}`)
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(400);
        });

        test('User not exists', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const resp = await request(app)
                                .put("/updateuser/dsaw23sad")
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            expect(resp.statusCode).toEqual(400);
        });

        test('User updated', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

            //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
            let elementUpdate:IUser = <IUser>{
                nome:"userupdate",
                email:"update@mail.com",
                password:"updatepassword"
            }; 

            const resp = await request(app)
                            .put(`/updateuser/${createUser.body.user.id}`)
                            .send(elementUpdate)
                            .auth(userCreatedAuthTest.token, {type: 'bearer'});       

            expect(resp.statusCode).toEqual(200);
            expect({email: resp.body.user.email, nome: resp.body.user.nome})
                .toEqual({email: elementUpdate.email, nome: elementUpdate.nome});
        });

    });

    describe('Delete user', ()=>{
        test('User not exists', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

             //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
             const resp = await request(app)
                            .delete("/deleteuser/ewqe2e2e3eqe")
                            .auth(userCreatedAuthTest.token, {type: 'bearer'});       
             expect(resp.statusCode).toEqual(400);
        });


        test('User deleted', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

             //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
             const resp = await request(app)
                            .delete(`/deleteuser/${createUser.body.user.id}`)
                            .auth(userCreatedAuthTest.token, {type: 'bearer'});       
             expect(resp.statusCode).toEqual(200);

        });
    });

    describe('Get one user', ()=>{
        test('User not exists', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

             //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
             const resp = await request(app)
                            .get("/oneuser/ewqe2e2e3eqe");

             expect(resp.statusCode).toEqual(400);
        });


        test('User returned', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

             //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
             const resp = await request(app)
                            .get(`/oneuser/${createUser.body.user.id}`);

             expect(resp.statusCode).toEqual(200);

        });
    });

    describe('Get all user', ()=>{
        test('User returned', async() => {
            let newElement:IUser = <IUser>{
                nome:"usercreate",
                email:"usercreate@mail.com",
                password:"usercreatepassword"
            }; 

             //add element
            const createUser = await request(app)
                                .post('/adduser')
                                .send(newElement)
                                .auth(userCreatedAuthTest.token, {type: 'bearer'});
            
             const resp = await request(app)
                            .get("/alluser");
                                   
             expect(resp.statusCode).toEqual(200);

        });
    });

});