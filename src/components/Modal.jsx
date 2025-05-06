import { createPortal } from "react-dom"
import { useAppContext } from "../contexts/app/app-context";;
import { IoMdClose } from "react-icons/io";
import { useModalContext } from "../contexts/app/modal-context";
const Modal = ({ title , body , children})=>{
    const {language , darkMode} = useAppContext()
    const {showModal,handleClose , isVisible} = useModalContext()
    return (
        <>
        {
            showModal && 
            createPortal(
            <div className={` ${darkMode ? 'dark' : ''} ${showModal ? 'showModal' : ''} scale-[0] [&.showModal]:scale-[1] duration-300
             modal-container fixed top-0 left-0 right-0 w-screen h-screen z-40
           bg-[rgb(205_205_205/72%)] flex justify-center items-center`}  onClick={handleClose}>
                <div className={`modal px-[5em] py-[1.5em] relative duration-300 ${isVisible ? 'scale-100' : 'scale-0'}
                rounded-[5px] bg-fuchsia-200 w-auto flex justify-center items-center flex-col gap-1.5`}
                onClick={(e)=>e.stopPropagation()}>
                    <span className="closeModal absolute z-20 left-2.5 top-1.5">
                           <IoMdClose   onClick={handleClose} className="text-[30px] duration-200 group-[&.darkMode]/fixMenu:fill-white" />
                    </span>
                    <div className="title w-auto flex justify-center items-center">
                        <p className={`text-black font-bold font-${language === 'fa' ? 'IranSans800':'Roboto800'}`}>
                         {title}
                        </p>
                    </div>
                    <div className="text w-auto flex justify-center items-center">
                    <p className={` text-black font-normal font-${language === 'fa' ? 'IranSans400':'Roboto400'}`}>
                     {body}
                        </p>
                    </div>
                    <div className="buttons w-full flex justify-center items-center gap-1.5">
                        {children}
                    </div>
                </div>
            </div>, document.getElementById("modal"))
        }
        </>
    )
}
export default Modal