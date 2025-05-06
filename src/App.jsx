import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router.jsx';
import './core/i18n.js';
import { ModalProvider } from "./contexts/app/modal-context.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductsProvider } from '@contexts/app/ProductsContext.jsx';
function App() {
  return (
    <>
      <ProductsProvider>
      <ModalProvider>
        <ToastContainer rtl 
             position="bottom-left"
             autoClose={3000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             pauseOnFocusLoss
             draggable
             pauseOnHover
             toastClassName="bg-fuchsia-700 text-white shadow-lg rounded-lg p-3"
             bodyClassName="text-center font-IranSans400" />
        <RouterProvider router={router} />
      </ModalProvider>
      </ProductsProvider>
    </>
  );
}

export default App;