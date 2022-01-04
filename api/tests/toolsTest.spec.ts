import Tools from '@/tools/tools';

describe('Tools class test', () =>{
    describe('Test of excedent price', () =>{
        test('time negative', async()=>{
            const response = await Tools.excedentPrice(1.2, -1);
            expect(response).toBe(null);
        })

        test('price negative', async()=>{
            const response = await Tools.excedentPrice(-1.2, 20);
            expect(response).toBe(null);
        })

        test('time is zero', async()=>{
            const response = await Tools.excedentPrice(1.2, 0);
            expect(response).toBe(0);
        })

        test('test correct', async()=>{
            const response = await Tools.excedentPrice(1.7, 20);
            expect(response).toBe(37.40);
        })
    })
})