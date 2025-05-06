import Button from "../../../../components/Button"
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../contexts/app/app-context";
import { useTranslation } from 'react-i18next';
import { useModalContext } from "../../../../contexts/app/modal-context";

const Product = ({id,title,image,description,price , deletePro})=>{
    const {language , darkMode} = useAppContext()
    const { handleOpen } = useModalContext()
    const {t} = useTranslation()
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + "..."
        }
        return text
      }
      let styleCustom={
        width:"max-content",
        margin:"auto"
      }
      const deleteHandler =(id)=>{
        handleOpen()
        deletePro(id)
      }
    return(
      <>
          <div  className={`${darkMode ? 'dark' : ''} group/product
         product shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-between pb-[2em]
        [&.dark]:border-white border-[1px] border-fuchsia-600
          w-full bg-amber-50 flex rounded-[10px] flex-col gap-1.5`}>
        <Link to={`products/${id}`} className="IMG px-[.5em] w-auto min-h-[200px] rounded-[10px] relative overflow-hidden max-h-[200px]">
            <span className={`price absolute font-${language === 'fa' ? 'IranSans400':'Roboto400'}
            top-1.5 left-1.5 w-max bg-fuchsia-600 rounded-[10px] px-[.5em] 
            py-[.5em] text-white`}>
                {price}$
            </span>
            <img src={image} alt={title}  className="w-full rounded-[10px] object-cover"/>
        </Link>
        <Link to={`products/${id}`} className={`title-product font-${language === 'fa' ? 'IranSans800':'Roboto800'}
            w-[90%] mx-auto flex justify-start items-center py-[.5em]`}>
        {title}
        </Link>
        <div className={`description-product w-[90%]  font-${language === 'fa' ? 'IranSans300':'Roboto300'}
        mx-auto flex justify-start items-start text-start flex-col`}>
        {truncateText(description,50)}
        </div>
        <div className="btn w-auto flex justify-center items-center">
        <Button name={"حذف محصول"} isSubmitting={false} styleCustom={styleCustom} onClick={()=>deleteHandler(id)}
        type={Button} lang={t("products.deleteProduct")}></Button>

        </div>
       
    </div>
 
      </>
    

    )
}
export default Product