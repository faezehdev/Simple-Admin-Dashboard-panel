
import ChangeLanguage from "../components/Change-language";
import ChangeTneme from "../components/Change-theme";
import Button from "../components/Button";
import { useAppContext } from "../contexts/app/app-context";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import SideBar from "./MainLayout/SideBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const logOut = ()=>{
    console.log('logOut');
    localStorage.removeItem('token')
    navigate('/login')
    
  }
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  if(!token){
    navigate("/login")
  }
   const { t } = useTranslation();
   const {language , darkMode} = useAppContext()
  const menus = [
   {
     title: t('menu.productManagement'),
     items: [t('menu.allProducts'), t('menu.categories')],
   },
   {
     title: t('menu.orders'),
     items: [t('menu.orderList'), t('menu.newOrders')],
   }
 ];

 const ChangeLanguageStyle = {
   position: "relative",
   top: "0",
   right: "0",
   ...(language === 'fa' ? { marginLeft: "1em" } : { marginRight: "1em" }),
 };

 const ChangeTnemeStyle = {
   position: "relative",
   top: "0",
   right: "0",

 };
 const [openHumMenu , setOpenHumMenu] = useState(false)
 const openFixMenuHandler = ()=>{
     setOpenHumMenu(!openHumMenu)
   }

  return (
    
    <div className="panel-container w-full min-h-screen justify-between flex flex-col">
      <header className="header my-[1em] w-full flex justify-between items-center">
        <div className="wrapper w-[90%] flex justify-between items-center mx-auto">
          <div className={`  ${openHumMenu && language === 'fa' ? 'translate-x-[-300px]' : ''}
    ${openHumMenu && language !== 'fa' ? 'translate-x-[300px]' : ''}
           Icons w-auto flex justify-start gap-3 items-center 
          [&.openMenu.ltr]:translate-x-[-300px] duration-500`}>
            <span onClick={(e) => openFixMenuHandler(e)}
            className="hover:cursor-pointer toggle-menu relative w-[50px] flex justify-start items-start flex-col gap-2">
              <span className="toggle-item w-[30px] h-[4px] rounded-[4px] bg-fuchsia-600 duration-150"></span>
              <span className="toggle-item w-[15px] h-[4px] rounded-[4px] bg-fuchsia-600 duration-150"></span>
              <span className="toggle-item w-[30px] h-[4px] rounded-[4px] bg-fuchsia-600 duration-150"></span>
            </span>
            <span className="change-language">
              <ChangeLanguage ChangeLanguageStyle={ChangeLanguageStyle} />
            </span>
            <span className="darkMode w-auto flex justify-start items-center">
              <ChangeTneme ChangeTnemeStyle={ChangeTnemeStyle} />
            </span>
          </div>
          <div className="logOutWrapper">
             <Button name={"خارج شوید"} isSubmitting={false} onClick={logOut}
              lang={"button.buttonName"} 
              type={Button} />
          </div>
        </div>
      </header>
   
       <SideBar openHumMenu={openHumMenu} setOpenHumMenu ={setOpenHumMenu} />
   
     <Outlet/>

     <footer className={`mb-3.5 mt-auto border-t-[1px] border-b-[1px] group/footer [&.darkMode]:border-amber-50 border-fuchsia-600 footer 
      w-full flex justify-center items-center py-[1em] ${darkMode ? 'darkMode' : ''}`}>
      <div className="copyRight mx-auto flex justify-center items-center">
         <p className={`group-[&.darkMode]/footer:text-amber-50 text-sm gap-1 flex w-full py-[.5em] group-[&.darkMode]/fixMenu:text-white
                        text-fuchsia-950 font-${language === 'fa' ? 'IranSans300':'Roboto300'}`}>
            Gisso-2025
         </p>
      </div>
     </footer>
    </div>
  );
}

export default MainLayout;
