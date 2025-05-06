import { useEffect } from "react";
import { httpInterceptedService } from "../core/http-service";
import { useLoaderData, useParams } from "react-router-dom";
import Product from "../faetures/categories/products/components/Product";
const Category = ()=>{
    const data = useLoaderData()
    const urlParams = useParams()
    useEffect(() => {
     console.log(urlParams.cat,'urlParams');
     
    }, [urlParams]);
    return (
        <>
        <div className="pros w-full grid grid-cols-4 gap-4">
            {[...data].filter((product)=> product.category == urlParams.cat).map((p)=>(
              <Product {...p}/>
            ))}
        </div>
        
        </>
    )
}
export default Category
export async function categoryLoader({request}) {
    const pros = await httpInterceptedService.get('/products')
    return pros.data
}