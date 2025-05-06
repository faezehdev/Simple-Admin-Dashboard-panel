import logo from '@assets/images/logo.png'
import loginBg from '@assets/images/login-img.png'
import { NavLink, Outlet , useLocation  } from 'react-router-dom';
import { useAppContext } from "../contexts/app/app-context";
import ChangeLanguage from '../components/change-language';
import { useTranslation } from 'react-i18next';
import ChangeTneme from '../components/Change-theme';
import { useEffect } from 'react';
const IdentityLayout = ()=>{
      const {t} = useTranslation()
    const {language , darkMode} = useAppContext()
    const location = useLocation();
    const path = location.pathname;
    let titleText = "";
    let linkText = "";
    let linkHref = "";
    if (path === "/" || path === "/login") {
      titleText = t('register.notRegister');
      linkText =t('register.signup');
      linkHref = "/register";
    } else if (path === "/register") {
      titleText =t('register.alreadyRegistered');
      linkText = t('register.login');
      linkHref = "/login";
    }
   let ChangeLanguageStyle={
      "position":"fixed"
    }
    let ChangeTnemeStyle={
      "position":"fixed"
    }
    return (
        <>
         <div className={`${darkMode ? 'dark' : ''} group/parent [&.dark]:bg-fuchsia-950 login-wrapper w-full flex flex-col h-screen overflow-hidden justify-center items-center`}>
            <div className="Language-drop px-2.5">
                <ChangeTneme ChangeTnemeStyle={ChangeTnemeStyle}/>
               <ChangeLanguage  ChangeLanguageStyle={ChangeLanguageStyle} />
            </div>
            <div className="logo mx-auto flex justify-center items-center">
            <img className='w-[200px] h-auto' src={logo} alt="" />
            </div>
            <div className="title  mx-auto flex justify-center items-center flex-col gap-2">
                <h1 className='text-4xl group-[&.dark]/parent:text-white text-fuchsia-950 Roboto800 font-bold '>
                    Gisso
                </h1>
                <span className={`text-sm gap-1 flex
                 text-fuchsia-950 font-${language === 'fa' ? 'IranSans300':'Roboto300'}
                  font-light max-w-[350px] text-center  group-[&.dark]/parent:text-white `}>
                {titleText} <NavLink to={linkHref}>{linkText}</NavLink>
                </span>
            </div>
            <div className="content-wrapper mx-auto justify-center items-center w-full flex">
                <div className="form-wrapper w-[400px] flex ">
                <Outlet />
                </div>
                <div className="login-img max-w-[400px]">
                    <img src={loginBg} alt="" />
                </div>
            </div>
           </div>
        </>
    )
}
export default IdentityLayout