import { useEffect } from "react"
import { useAppContext } from "../contexts/app/app-context"
const ChangeTneme = ({ChangeTnemeStyle})=>{
    const {darkMode , changeTheme} = useAppContext()
    const handleCheck = ()=>{
    changeTheme(!darkMode)
    }
;
    return (
        <>
      <div  style={ChangeTnemeStyle} dir="ltr"  className="theme top-[2.5em] right-[10em]">
        <input type="checkbox" className="checkbox opacity-0 absolute left-2.5 top-2.5" 
        onChange={handleCheck} checked={darkMode} id="checkbox"/>
        <label htmlFor="checkbox" className="checkbox-label bg-fuchsia-600 w-[50px] h-[26px] rounded-4xl 
        relative py-[5px] px-[5px] hover:cursor-pointer flex justify-center items-center">
            <i className="fas fa-moon text-[#f1c40f]"></i>
            <i className="fas fa-sun text-[#f39c12]"></i>
            <span className="ball bg-[#fff] w-[22px] h-[22px] absolute left-[2px] top-[2px] rounded-[50%] duration-[.2s]"></span>
        </label>
     </div>
  
        </>
    )
}
export default ChangeTneme