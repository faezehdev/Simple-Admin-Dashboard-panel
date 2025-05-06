import { useForm } from 'react-hook-form'
import React from 'react';
import { useNavigation, useSubmit } from 'react-router-dom';
const Form = ({usedForm , children , onSubmitForm })=>{
    const navigation = useNavigation()
    const isSubmitting = navigation.state != 'idle'
       const {register ,handleSubmit, formState :{errors},watch,reset}  = useForm()
       const defaultSubmit = useSubmit(); 
       const onSubmit = async  (data)=>{
        console.log("Form submitted data", data);
        const { RePassword, ...userData } = data || {};
     if (onSubmitForm) {
      try {
       
        await onSubmitForm(userData);  // ← منتظر بمون تا کامل اجرا بشه
      } catch (e) {
        console.error(e);
      }
    } 
    else {
      defaultSubmit(userData, { method: 'post' });
      console.warn("onSubmitForm not provided!");
    }
    reset();
       }
       const childrenWithProps = React.Children.map(children, child =>
       {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { register, errors, watch, isSubmitting });
          }
          return child; 
       }
      );

    return(
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={`${usedForm} w-full flex flex-col `}>
          {childrenWithProps}
            </form>
        </>
    )
}
export default Form