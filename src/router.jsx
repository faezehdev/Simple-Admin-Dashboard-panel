import { createBrowserRouter } from "react-router-dom";
import Login from "./faetures/categories/identity/components/Login";
import Register from "./faetures/categories/identity/components/Register";
import IdentityLayout from "./layouts/Identity-layout";
import { RegisterAction } from "./faetures/categories/identity/components/Register";
import {LoginAction} from "./faetures/categories/identity/components/Login"
import MainLayout from "./layouts/Main-layout";
import Products from "./pages/Products";
import Category from "./pages/Category";
import NotFound from "./pages/notFound";
// import Products, { ProductsLoader } from "./pages/Products";
import ProductDetail from "./faetures/categories/products/components/Product-detail";
import {ProDetailLoader} from "./faetures/categories/products/components/Product-detail"
import { categoryLoader } from "./pages/Category";
const router = createBrowserRouter([
  {
     path:'/',
     element:<MainLayout/>,
     children:[{
          index: true,    
          element:<Products/>
     },
     {
      path:'products/:id',
      element:<ProductDetail/>,
      loader:ProDetailLoader
     },
     {
      path:'/category/:cat',
      element:<Category/>,
      loader:categoryLoader
     }
    ]
  },
  {
    element: <IdentityLayout />,
    children: [
        {
          
            element: <Login />
        },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
        errorElement : <Login/>
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
        errorElement : <Register/>
      }
    ]
  },
  {
    path:'*',
    element:<NotFound/>,
  }
]);

export default router;
