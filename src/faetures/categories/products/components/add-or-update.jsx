import Input from "@components/Input"
import { useTranslation } from 'react-i18next';
import Button from "@components/Button"
import Form from '@components/Form'
import TextArea from "@components/TextArea";
import { useToast } from "../../../../hooks/useToast";
const AddOrUpdate = ({setShowAddProduct})=>{
    const { t } = useTranslation();
    const {postProduct} = useToast()
    const submitForm = async (data)=>{
      console.log('submitForm');
      
      const newProduct = {
        "title": data.title,
        "price": parseFloat(data.price),
        "description": data.description,
        "category": data.category,
        "image": `/images/${data.image}`
      };
      console.log('newProduct:', data);
      try {
        const response = await postProduct(newProduct);
        console.log('Product successfully posted:', response);
        setShowAddProduct(false);
      } catch (error) {
        console.error('Error posting product:', error);
      }
    }
    return (
   <div className="addModal w-[90%] mx-auto flex justify-center items-center">
     <Form usedForm="addForm" onSubmitForm={submitForm}>
     <Input
          type="text"
          name="title"
          title={t("products.proName")}
          validation={{
            required: t("products.validation.proNameRequired"),
          }}
        />

        <Input
          type="text"
          name="price"
          title={t("products.price")}
          validation={{
            required:t("products.validation.priceRequired"),
            pattern: {
              value: /^[0-9.]+$/,
              message:t("products.validation.justNumber"),
            },
          }}
        />

        <Input
          type="text"
          name="category"
          title={t("products.category")}
          validation={{
            required: t("products.validation.categoryRequired"),
          }}
        />
        <TextArea
          type="text"
          name="description"
          title={t("products.description")}
          validation={{
            required: t("products.validation.descriptionRequired"),
          }}
        />

        <Input
          type="text"
          name="image"
          title={t("products.image")}
          validation={{
            required:t("products.validation.imageRequired"),
          }}
        />
        <div className="buttons w-full flex justify-start gap-2.5">
                <Button type='button' lang={"products.validation.close"}  onClick={()=> setShowAddProduct(false)}
                 name={t('products.validation.close')} />
                <Button type="submit" lang={"products.validation.saveChanges"} 
                 name={t('products.validation.saveChanges')} />
        </div>
     </Form>

   </div>
    )
}
export default AddOrUpdate