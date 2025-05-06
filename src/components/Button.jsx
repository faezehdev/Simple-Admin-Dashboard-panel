import { useAppContext } from "../contexts/app/app-context";
import { useTranslation } from 'react-i18next';
const Button = ({name ,   type = "button" , isSubmitting=false, lang ,styleCustom={} , onClick , children})=>{
    const {language , darkMode} = useAppContext()
     const {t} = useTranslation()
    return (
        <button onClick={onClick}
        style={styleCustom} disabled={isSubmitting} type={type} className={`button-submit bg-fuchsia-600 [&.dark]:bg-white
            [&.dark]:text-fuchsia-600 [&.dark]:border-fuchsia-600 [&.dark]:border-[3px] mt-4
        hover:bg-fuchsia-700 ${darkMode ? 'dark' : ''} text-white font-${language === 'fa' ? 'IranSans400':'Roboto400'}
         duration-300 hover:cursor-pointer font-bold py-2 px-4 border rounded-[4px]`}>
         {/* {isSubmitting ? t(lang) : name} */}
       {lang ? t(lang) : name}
   {children}
       </button>
    )
}
export default Button