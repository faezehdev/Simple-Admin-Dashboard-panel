import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-Reducer";
import { useTranslation } from "react-i18next";
const AppContext = createContext()
const getInitialState = () => {
    return {
      language: localStorage.getItem("language") || "en",
      darkMode: localStorage.getItem("theme") === "true" 
    };
  };
const AppProvider = ({children})=>{
    const [state , dispatch] =  useReducer(appReducer, {}, getInitialState);
    const {i18n} = useTranslation()
    const changeLang = (lang)=>[
        dispatch({type:'CHANGE_LANGUAGE',payload:lang})
    ]
    const changeTheme = (darkMode)=>[
        dispatch({type:'CHANGE_THEME',payload:darkMode})

    ]
    useEffect(()=>{
       i18n.changeLanguage(state.language)
       localStorage.setItem('language',state.language)
       document.body.setAttribute('dir', state.language === "fa" ? 'rtl' : 'ltr')
    },[state.language])

    useEffect(() => {
        console.log('theme', state.darkMode);
        localStorage.setItem('theme', state.darkMode) // ذخیره به صورت string
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [state.darkMode]);
    return <AppContext.Provider value={{...state , changeLang , changeTheme}}>
        {children}
    </AppContext.Provider>
}
const useAppContext =()=>{
    return useContext(AppContext)
}
export {useAppContext , AppProvider}