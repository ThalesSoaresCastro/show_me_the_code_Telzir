import UserService from "@/services/UserService";
import prismaCLient from '@/prisma';

interface IUserMock {
    id: string;
    nome: string;
    password: string;
    email:string;
    create_at: Date | any;
}

interface IUser {
    id?: string;
    nome?: string;
    email?: string;
    password?:string;
    create_at?: Date;
}

interface IUserUpdated{
    nome: string;
    email: string;
    password:string;
}

describe('Test UserService', ()=>{

    afterAll(async()=>{
        await prismaCLient.user.deleteMany({});
        console.log('Delete all');
    });

    describe('created new User', ()=>{

        test('Success to created new user', async()=>{
            
            //await prismaCLient.user.deleteMany({});
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            //prismaMock.user.create.mockResolvedValue(userCreatedTest);

            let result = await UserService.newUser(userCreatedTest);

            let resultUser:IUser= {
                nome: result.user.nome,
                email: result.user.email
            }

            expect(result.user).toHaveProperty("id");
            expect(result.message).toEqual('New user created.');
            expect(resultUser).toEqual({nome: userCreatedTest.nome, email: userCreatedTest.email});
        });

        test('User exists', async()=>{

            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            await UserService.newUser(userCreatedTest);

            let result = await UserService.newUser(userCreatedTest);

            let resultUser:IUser= {
                nome: result.user.nome,
                email: result.user.email
            }
        
            expect(result.message).toEqual('User already exists.');
            expect(resultUser).toEqual({nome: userCreatedTest.nome, email: userCreatedTest.email});

        });

    });

    describe('update User', ()=>{

        test('Success to updated user', async()=>{
            
            //await prismaCLient.user.deleteMany({});
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);

            const userUp: IUserUpdated = {
                nome: "testeup",
                password: "passwordup",
                email: "testup@mail.com"
            }
            
            let result = await UserService.updateUser(userUp, useradd.user.id as string );

            let resultUser:IUser= {
                nome: result.user.nome,
                email: result.user.email
            }

            expect(result.message).toEqual('Success on changing user.');
            expect(resultUser).toEqual({nome: userUp.nome, email: userUp.email});
        });

        test('User not exists', async()=>{
            
            //await prismaCLient.user.deleteMany({});
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);

            const userUp: IUserUpdated = {
                nome: "testeup",
                password: "passwordup",
                email: "testup@mail.com"
            }
            
            let result = await UserService.updateUser(userUp, '8a4554b' );

            expect(result.message).toEqual('User not exists.');

        });

    });

    describe('delete User', ()=>{

        test('Success to delete user', async()=>{
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);
            let result = await UserService.deleteUser( useradd.user.id as string );

            expect(result.message).toEqual('Success on deleting user.');
        });

        test('User not exists to delete', async()=>{
            
            //await prismaCLient.user.deleteMany({});
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);

            let result = await UserService.deleteUser( '8a4554b' );

            expect(result.message).toEqual('User not exists');
            

        });

    });

    describe('Get One User', ()=>{

        test('Success to get one user', async()=>{
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);            
            let result = await UserService.findOneUser( useradd.user.id as string );

            expect(result.message).toEqual('User exists.');
        });

        test('Get One User not exists', async()=>{
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);            
            let result = await UserService.findOneUser( 'b45e1e' );

            expect(result.message).toEqual('User not exists');
            expect(result.user).toEqual(null);

        });

    });

    describe('Get all User', ()=>{

        test('Success to get all user', async()=>{
            
            const userCreatedTest:IUserMock = {
                id: "18908a28-7e9f-4a6d-9617-8a4554b45e1e",
                nome:"testeuser",
                password:"password",
                email: "testeuser@mail.com",
                create_at: "2022-01-01T18:07:00.878Z"
            }

            let useradd = await UserService.newUser(userCreatedTest);            
            let result = await UserService.findAllUsers( );

            expect(result.message).toEqual('All users.');
        });

        
    });


});
