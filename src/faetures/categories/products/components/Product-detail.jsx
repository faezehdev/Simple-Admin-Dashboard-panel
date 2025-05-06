import { useLoaderData } from "react-router-dom"
import { httpInterceptedService } from "../../../../core/http-service"
import { useAppContext } from "../../../../contexts/app/app-context";
import { useTranslation } from 'react-i18next';
const ProductDetail = ()=>{
    const {id,title,image,description,price} = useLoaderData()
    const {language , darkMode} = useAppContext()
    const {t} = useTranslation()

    return(
       <>
           <div  className={`${darkMode ? 'dark' : ''} group/product product 
                 w-full flex rounded-[10px] flex-col gap-1.5 my-[2em]`}>
               <div className="IMG px-[.5em] w-[350px] mx-auto rounded-[10px] relative overflow-hidden ">
                   <img src={image} alt={title}  className="w-full rounded-[10px] object-cover"/>
               </div>
               <div className={`title-product font-${language === 'fa' ? 'IranSans800':'Roboto800'}
                   w-[90%] mx-auto text-black group-[&.dark]/product:text-white flex justify-start items-center py-[.5em]`}>
               {title}
               </div>
               <span className={`price  font-${language === 'fa' ? 'IranSans400':'Roboto400'}
                  w-[90%] mx-auto  rounded-[10px]  
                   py-[.5em] text-black group-[&.dark]/product:text-white `}>
                       {price}$
                   </span>
               <div className={`description-product w-[90%]  font-${language === 'fa' ? 'IranSans300':'Roboto300'}
               mx-auto flex justify-start text-black items-start text-start flex-col group-[&.dark]/product:text-white `}>
               {description}
               </div>
           </div>
       </> 
    )
}
export async function ProDetailLoader ({params}){
    let response = await httpInterceptedService.get(`/products/${params.id}`)
    return response.data
}
export default ProductDetail
