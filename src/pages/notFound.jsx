import Button from "@components/Button"
import error from "@assets/images/404.jpg"
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom"
const NotFound = ()=>{
         const {t} = useTranslation()
    const styleCustom={
        marginBottom:"auto"
    }
    return(
        <>
        <div className="page404 mx-auto mt-auto w-full flex justify-center items-center flex-col h-screen">
            <img src={error} alt="" className="w-[500px]  mt-auto object-cover my-auto mx-auto" />
            <Button type="button" name=""  lang='' styleCustom={styleCustom}>
                   <Link to="/"> {t("error.404")} </Link>
            </Button>
        </div>
        </>
    )
}
export default NotFound