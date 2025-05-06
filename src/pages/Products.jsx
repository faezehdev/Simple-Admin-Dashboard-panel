import { httpInterceptedService } from "../core/http-service"
import { useTranslation } from 'react-i18next';
import { useAppContext } from "../contexts/app/app-context";
import Button from "../components/Button";
import { Await , defer, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import ProductList from "../faetures/categories/products/components/ProductList";
import { Suspense, useState } from "react";
import Modal from "../components/Modal";
import { useModalContext } from "../contexts/app/modal-context";
import { toast } from 'react-toastify';
import AddOrUpdate from "../faetures/categories/products/components/add-or-update";
import { useProductsContext } from "../contexts/app/ProductsContext";
const Products = ()=>{
       const { t } = useTranslation();
       const {language , darkMode} = useAppContext()
       let btnStyle ={
        width:"fit-content",
        padding:".5em 2em",
        fontSize:"14px"
       }
    //    const data = useLoaderData(); 
       let modalBTNStyle ={
        border:"none",
        backgroundColor :"oklch(59.1% 0.293 322.896)",
        color:"white",
        width:"80px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
    const [showAddProduct , setShowAddProduct] = useState(false)
    const {handleClose} = useModalContext()
    const [selectedProduct , setSelectedProduct ] = useState()
    const deleteProduct = (proID)=>{
    console.log('deleteProduct' , proID);
    setSelectedProduct(proID)
    }
    const {handleDeletePro } = useProductsContext()
    const deletePr = ()=>{
        handleClose()
        handleDeletePro(selectedProduct)
    }
    // const revalidator = useRevalidator();
    // const handleDeletePro = async()=>{
    //     handleClose()
    //     const response = httpInterceptedService.delete(`/products/${selectedProduct}`)
    //     toast.promise(response , {
    //         pending:t('fetchData.loadP'),
    //         success:{
    //           render(){
    //             // revalidator.revalidate();
    //             return t('fetchData.deleteProductY')
    //           }
    //         },
    //         error:{
    //             render({data}){
    //                return t('fetchData.deleteProductN')
    //             }
    //         }
    //     } , {
    //     })
    // }
    return (
        <>
   
          <div className="titleMain my-[1.5em] w-[90%] mx-auto flex justify-between items-center">
      <h1 className={`text-xl gap-1 flex
                 text-fuchsia-950 
                  ${darkMode ? '!text-amber-50' : 'text-fuchsia-950'}
    ${language === 'fa' ? 'font-IranSans800' : 'font-Roboto800'}
                  font-light text-center`}>
      { t("products.proTitleMain")}
      </h1>
      <Button name={" افزودن محصول جدید"} onClick={()=> setShowAddProduct(!showAddProduct)}
       styleCustom={btnStyle} isSubmitting={false}
       lang={"products.addNewPro"} type="Button" />
     
     </div>
     {
        showAddProduct && <AddOrUpdate setShowAddProduct={setShowAddProduct}/>
       }
     <div className="products_container my-[2em] flex flex-col gap-2 w-[90%] mx-auto">
 
     <ProductList deletePro={deleteProduct} />
      {/* <Suspense fallback={<p>t('fetchData.load')</p>}>
    
        </Suspense> */}
        {/* <Suspense fallback={<p>{t('fetchData.load')}</p>}>
  <Await resolve={data.products}>
    {(products) => <ProductList deletePro={deleteProduct} products={products} />}
  </Await>
</Suspense> */}

     
     </div>
     <Modal  title={t("modal.deleteProductTitle")} body={t("modal.deleteProductBody")}>
    <Button name={"بله "} onClick={() => deletePr()}  isSubmitting={false} styleCustom={modalBTNStyle}
        type="Button" lang={t("modal.yes")}></Button>
        <Button name={"خیر"}   onClick={() => handleClose()}
         isSubmitting={false}  styleCustom={modalBTNStyle}
        type="Button" lang={t("modal.no")}></Button>
      </Modal>

        </>
      
    )
}
export default Products
// export async function ProductsLoader() {
//     const products = await loadProducts();  
//     return defer({
//         products  
//     });
// }
// const loadProducts = async ()=>{
//     const response = await httpInterceptedService.get('/products')
//     return response.data
// }