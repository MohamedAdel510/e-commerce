import { CategoryType } from "../_interfaces/products";

export async function getAllCategories() :Promise<CategoryType[] | null>{
    try{
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
            cache:"force-cache"
        });
        const finalResult = await res.json();
        // console.log('FinalResult: ', finalResult);
        return finalResult.data;
    }catch(error){
        console.log(error);
        return null;
    }
}