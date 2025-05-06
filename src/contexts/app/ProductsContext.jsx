import React, { createContext, useContext, useState, useEffect } from 'react';
import { httpInterceptedService } from '@core/http-service';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { t } = useTranslation();
  const fetchProducts = async () => {
    try {
      const response = await httpInterceptedService.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    if (category) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  };

  const handleDeletePro = async (selectedProduct) => {
    const response = httpInterceptedService.delete(`/products/${selectedProduct}`);
    toast.promise(response, {
      pending: t('fetchData.loadP'),
      success: {
        render() {
          fetchProducts();
          return t('fetchData.deleteProductY');
        }
      },
      error: {
        render({ data }) {
          return t('fetchData.deleteProductN');
        }
      }
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        filteredProducts,
        filterProducts,
        handleDeletePro,
        fetchProducts 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
