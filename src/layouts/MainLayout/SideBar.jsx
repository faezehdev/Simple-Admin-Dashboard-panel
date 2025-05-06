import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import logo from '@assets/images/logo.png'
import { IoMdClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { useAppContext } from "../../contexts/app/app-context";
import { useEffect, useState } from "react";
import { useProductsContext } from "@contexts/app/ProductsContext";
import { Link } from "react-router-dom";
const SideBar = ({openHumMenu , setOpenHumMenu})=>{
    const { t } = useTranslation();
    const {language , darkMode} = useAppContext()
    const {filteredProducts, setFilteredProducts} = useProductsContext();
    const [categorys , setCategories] = useState([])
    useEffect(()=>{
console.log('SideBar',filteredProducts);
const allCategories = filteredProducts.map(p => p.category);
const uniqueCategories = [...new Set(allCategories)];
setCategories(uniqueCategories);
    },[filteredProducts])
    useEffect(() => {
      console.log(categorys,'categorys');
    }, [categorys]);
   const menus = [
    {
      title: t('menu.productManagement'),
      items: [
         {
            link:'/',
            title:  t('menu.allProducts')
         },
         // {
         //    link:'/categories',
         //    title:  t('menu.categories')
         // }
         ],
    },
   //  {
   //    title: t('menu.orders'),
   //    items:[
   //       {
   //          link:'/orderList',
   //          title:  t('menu.orderList')
   //       },
   //       {
   //          link:'/newOrders',
   //          title:  t('menu.newOrders')
   //       }
   //    ]
     
   //  }
  ];
  const dynamicMenus = [...menus];
if (categorys.length > 0) {
  const categoryItems = categorys.map(cat => ({
    link: `/category/${cat}`,
    title: cat,
  }));
  dynamicMenus[0].items = [...dynamicMenus[0].items, ...categoryItems];
}
    const [openMenus, setOpenMenus] = useState({});
    const toggleMenu = (index) => {
      setOpenMenus((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
    const CloseFixMenuHandler = ()=>{
    setOpenHumMenu(!openHumMenu)
      }
    return(
        <div className={`${darkMode ? 'darkMode' : ''} ${language === 'fa' ? 'translate-x-[100%] right-0':'translate-x-[-100%] left-0'}
        ${openHumMenu ? 'openMenu' : ''} [&.openMenu]:translate-x-[0]
         duration-500 group/fixMenu fixMenu  bg-amber-50
       h-screen flex flex-col fixed w-[300px] z-30 top-0 [&.darkMode]:bg-fuchsia-600`}>
        <div className="wrapper relative
         w-full mx-auto flex flex-col h-auto overflow-y-auto my-[1em]">
           <span onClick={(e) => CloseFixMenuHandler(e)} className="closemenu absolute right-2 hover:cursor-pointer  top-2.5">
           <IoMdClose className="text-[30px] duration-200 group-[&.darkMode]/fixMenu:fill-white" />
           </span>
        <div className="Menu w-full flex flex-col justify-start items-start">
           <div className="logo mx-auto w-auto flex justify-center items-center">
              <img className="w-[150px] h-[100px] mx-auto flex" src={logo} alt="" />
           </div>
           <div className="drops-menu w-full flex flex-col">
           {menus.map((menu, index) => (
              <div key={index} className="drop-Downs w-full flex flex-col">
                 <div
                    className="title px-[15px] py-[.5em] w-full flex justify-between items-center cursor-pointer"
                    onClick={() => toggleMenu(index)}
                 >
                    <p className={`text-lg gap-1 flex group-[&.darkMode]/fixMenu:text-white
                       text-fuchsia-950 font-${language === 'fa' ? 'IranSans800':'Roboto800'}
                       font-light max-w-[350px] text-center`}
                    >
                    {menu.title}
                    </p>
                    <span className="icon">
                    {openMenus[index] ? (
                       <IoMdArrowDropup className="duration-200 group-[&.darkMode]/fixMenu:fill-white" />
                    ) : (
                       <IoMdArrowDropdown className="duration-200 group-[&.darkMode]/fixMenu:fill-white" />
                    )}
                    </span>
                 </div>
  
                 <div className={`drop-down w-full flex flex-col transition-all duration-300
                    overflow-hidden ${openMenus[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                 >
                    <ul className="w-full flex flex-col">
                    {menu.items.map((item, i) => (
                       <li
                          key={i}
                          className={` px-[15px] hover:opacity-[.8] hover:bg-fuchsia-400 duration-300 text-sm gap-1 flex w-full py-[.5em] group-[&.darkMode]/fixMenu:text-white
                          text-fuchsia-950 font-${language === 'fa' ? 'IranSans300':'Roboto300'}
                          font-light max-w-[350px] text-center cursor-pointer`}
                       >
                        <Link to={item.link}>
                        {item.title}
                        </Link>
                         
                       </li>
                    ))}
                    </ul>
                 </div>
              </div>
  ))}
           </div>
        </div>
        </div>
    
       </div>
    )
}
export default SideBar