import prismaClient from '@/prisma';

interface Element{
    origin: string,
    destiny: string,
    price: number
}

const AddDataBD = async()=>{

    const res = await prismaClient.priceList.findMany();

    if(res.length > 0){
        console.log('Banco já possui dados cadastrados...\n');
        return;
    }

    console.log('Cadastrando dados...\n');

    const dataList:Element[] = [
        {origin: '011', destiny: '017', price: 1.23},
        {origin: '016', destiny: '011', price: 2.90},
        {origin: '011', destiny: '017', price: 1.70},
        {origin: '017', destiny: '011', price: 2.70},
        {origin: '011', destiny: '018', price: 0.90},
        {origin: '018', destiny: '011', price: 1.90},
    ];

    await prismaClient.priceList.createMany({
        data: dataList
    });

    const list = await prismaClient.priceList.findMany();

    console.log('Dados cadastrados: ', list);
    console.log('\nDados criados com sucesso...\n');

    return list;
}

export default AddDataBD;