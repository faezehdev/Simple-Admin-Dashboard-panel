import { createContext } from "react";
import { useEffect, useState , useContext } from "react";
export const ModalContext = createContext()
export const ModalProvider = ({children , isOpen})=>{
     const [isVisible, setIsVisible] = useState(false);
     const [showModal , setModal] = useState(false)
        useEffect(() => {
            if (isOpen) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, [isOpen]);
        const handleClose = () => {
            setIsVisible(false);
            setTimeout(() => {
                setModal(false);
            }, 300);
        }
        const handleOpen= () => { 
            console.log('open modal');
             
        setIsVisible(true);
        setTimeout(() => {
          setModal(true);
        }, 300);
        };

 return <ModalContext.Provider value={{showModal, handleClose , handleOpen , isVisible} }>
      {children}
 </ModalContext.Provider>
}
const useModalContext =()=>{
    return useContext(ModalContext)
}
export {useModalContext}