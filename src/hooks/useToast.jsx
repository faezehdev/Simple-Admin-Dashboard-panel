import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
// import { useRevalidator } from 'react-router-dom';
import { httpInterceptedService } from '@core/http-service';
export function useToast() {
  const { t } = useTranslation();
  // const revalidator = useRevalidator();
  const postProduct = (productData) => {
    const promise = httpInterceptedService.post('/products', productData);
    toast.promise(
      promise,
      {
        pending: t('fetchData.loadP'),
        success: {
          render() {
            // revalidator.revalidate();
            return t('fetchData.addNewPro');
          }
        },
        error: {
          render({ data }) {
            return t('fetchData.addNewProfailed');
          }
        }
      }
    );

    return promise;
  };

  return { postProduct };
}
