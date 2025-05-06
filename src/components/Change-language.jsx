import { useEffect, useRef, useState } from "react";
import faFlag from '../assets/images/fa.png'
import enFlag from '../assets/images/us.png'
import { useAppContext } from "../contexts/app/app-context";
const ChangeLanguage = ({ChangeLanguageStyle}) => {
  const [open, setOpen] = useState(false);
  const {language , changeLang,darkMode} = useAppContext()
  const ref = useRef()
  useEffect(()=>{
    const CheckifClickOutside = (e)=>{
        if(ref.current && open && !ref.current.contains(e.target)){
            setOpen(false);
        }
    }
 
   document.addEventListener('mousedown',CheckifClickOutside)
   return () =>{
   document.removeEventListener('mousedown',CheckifClickOutside)
   }
  },[open])
  useEffect(() => {
    setOpen(false);
  
  }, [language]);
  return (
    <div ref={ref} style={ChangeLanguageStyle} className={`langC 
     w-auto flex border-[1px] rounded-[5px] ${darkMode ? "darkMode" : ''}  [&.darkMode]:border-fuchsia-600  border-fuchsia-600 px-1.5 py-[.4em]  top-[2em] right-[5em]`}>
      <button
        onClick={() => setOpen(!open)}
        className="activeLang hover:cursor-pointer text-white w-auto inline-flex items-center"
        type="button"
      >
      <div className="drop-nav w-[30px] flex ">
            <img src={language === 'fa' ? faFlag : enFlag} alt=""  className="w-full object-cover"/>
        </div>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
     <div  className={`dropdownItems w-full flex flex-col right-0 justify-center items-center absolute 
     border-[1px] rounded-[5px]  ${darkMode ? "darkMode" : ''}  [&.darkMode]:border-fuchsia-600  border-fuchsia-600  top-[3em]`}>
        <div className="drop-nav hover:cursor-pointer w-[30px] flex " onClick={()=>changeLang("fa")}>
            <img src={faFlag} alt="" className="w-full object-cover" />
        </div>
        <div className="drop-nav hover:cursor-pointer w-[30px] flex " onClick={()=>changeLang("en")}>
            <img src={enFlag} alt=""  className="w-full object-cover"/>
        </div>
     </div>
      )}
    </div>
  );
};

export default ChangeLanguage;
