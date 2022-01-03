import React,{ 
    createContext, 
    useState, 
    useEffect 
} from "react";

import { GetAllElements } from "../services/TelzirApiService";


type ItemElement = {
    id: string;
    origin: string;
    destiny: string;
    price: number;
    create_at: any;
}

type ElementResult = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
    costPlan: number;
    costNotPlan: number;
}

type ListDataContext = {
    items: Array<ItemElement> | null;
    result: ElementResult | null;
    setDataList: ( elements:Array<ItemElement> ) => Promise<void>;
    setResult: ( resultElement: ElementResult ) => Promise<void>;
}

const DataContext = createContext<ListDataContext>({} as ListDataContext);

export const DataProvider: React.FC = ({children}) =>{
    const [ items, SetItems ] = useState< Array<ItemElement> | null >(null);
    const [ result, SetRes ] = useState<ElementResult | null>(null);

    useEffect(()=>{
        async function SetAllData() {
          const resp = await GetAllElements();  
          if(resp.status === 200){
            await setDataList(resp.data.elements);
          }
        }
        if(!items || items.length <= 0 ) {
            SetAllData();
        };

    },[items]);

    async function setDataList( items: Array<ItemElement> ){
        SetItems(items);
        //if(items){
        //    const resp = await GetAllElements();
        //    if(resp.status === 200){
        //        SetItems(resp.data.elements);
        //    }
        //}
    }

    async function setResult( result: ElementResult ){
        SetRes(result);
    }



    return(
        <DataContext.Provider
            value={{items: items, result:result, setDataList, setResult }}
        >
            {children}
        </DataContext.Provider>
    );

}


export default DataContext;