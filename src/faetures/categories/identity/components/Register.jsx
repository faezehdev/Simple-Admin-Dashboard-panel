import Form from '@components/Form'
import Input from '@components/Input'
import Button from '@components/Button'
// import { httpService } from '../../../../../core/http-service'
import { httpService } from '@core/http-service'
import { useActionData, useNavigate, useRouteError } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../../../contexts/app/app-context'
const Register = ()=>{
  const {language , changeLang} = useAppContext()
  const {t} = useTranslation()
    const routeErrors = useRouteError()
    const actionData = useActionData();
const navigate = useNavigate()
   useEffect(() => {
   
    
    if(actionData){
      console.log(actionData.message);
        setTimeout(() => {
            navigate('/login')
            
        }, 2000);
    }
    return () => {
        
    };
   }, [actionData]);
    return (
          <>
        <Form usedForm="register">
         <Input
        type="text"
        name="username"
        title={t('register.username')}
        validation={{
            required: t('register.validdation.usernameRequired'),
            minLength: { value: 3, message: t('register.usernameTooShort')}
        }}
      />

  <Input
    type="password"
    name="password"
    title={t('register.password')}
    validation={{
      required: t('register.validdation.passwordRequired'),
      minLength: { value: 6, message: t('register.validdation.passwordTooShort')}
    }}
  />

  <Input
    type="password"
    name="Repassword"
    title={t('register.RePassword')}
    validation={(watch) => ({
      required: t('register.validdation.RepeatpasswordRequired'),
      validate: {
        matchPassword: (value) => value === watch('password') || t('register.validdation.notMatching'),
  
      }
    })}
  />

  <Button type="submit" name={t('register.registerBtn')}  lang={"register.saving"} />
  {actionData?.success && (
  <p className={`text-center  font-${language === 'fa' ? 'IranSans800':'Roboto800'} 
  text-xl text-green-400 font-bold `}>
    {t(`register.validdation.${actionData.message}`)}
  </p>
)}
{!actionData?.success && actionData?.message && (
  <p className={`text-center  font-${language === 'fa' ? 'IranSans800':'Roboto800'}
   text-xl text-red-400 font-bold`}>
    {t(`register.validdation.${actionData.message}`)}
  </p>
)}
   {routeErrors && (
     routeErrors.response?.data.map(d=>(
        <p className={`text-center  font-${language === 'fa' ? 'IranSans800':'Roboto800'} text-xl text-red-400
         font-bold`}>
        {d.description}
      </p> 
     ))
   )}
</Form>

        </>
    )
}
export default Register
export async function RegisterAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
 
    const payload = {
      email: "eve.holt@reqres.in", 
      password: data.password,
    };
  
    try {
      const response = await httpService.post('/register', payload);
      return {
        success: true,
        message: 'RegisterSuccess',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'RegisterFaild',
      };
    }
  }
  