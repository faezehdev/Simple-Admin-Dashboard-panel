
import Form from '@components/Form'
import Input from '@components/Input'
import Button from '@components/Button'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../../../contexts/app/app-context'
import { redirect, useActionData , useRouteError } from 'react-router-dom'
import { useEffect } from 'react'
// import { httpService } from '../../../../../core/http-service'
import { httpService } from '@core/http-service'
const Login = ()=>{
  const actionData = useActionData();
  const {language , changeLang} = useAppContext()
  const routeErrors = useRouteError()
     useEffect(() => {
     
      
      if(actionData){
        console.log('login actionData =>',actionData.message);
      }
      return () => {
          
      };
     }, [actionData]);
    const {t} = useTranslation()
    return (
        <>
  
                <Form usedForm='login'>
                  <Input
                       type="text"
                       name="username"
                       title={t('loginP.username')}
                       validation={{
                           required: t('loginP.validdation.usernameRequired'),
                           minLength: { value: 3, message: t('loginP.usernameTooShort')}
                       }}
                     />
                 <Input
                   type="password"
                   name="password"
                   title={t('loginP.password')}
                   validation={{
                     required: t('loginP.validdation.passwordRequired'),
                     minLength: { value: 6, message: t('loginP.validdation.passwordTooShort')}
                   }}
                 />
                    <Button type='submit' lang={"loginP.loginBtn"}  name={t('loginP.saving')} />
                    {actionData?.success && (
  <p className={`text-center  font-${language === 'fa' ? 'IranSans800':'Roboto800'} 
  text-xl text-green-400 font-bold `}>
    {t(`loginP.validdation.${actionData.message}`)}
  </p>
)}
{!actionData?.success && actionData?.message && (
  <p className={`text-center  font-${language === 'fa' ? 'IranSans800':'Roboto800'}
   text-xl text-red-400 font-bold`}>
    {t(`loginP.validdation.${actionData.message}`)}
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
export default  Login

export async function LoginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
 const payload = {
  username: data.username, 
    password: data.password,
    };
    console.log('LoginAction =>',payload);
    try {
      const response = await httpService.post('/login', payload);
      if(response.status === 200){
 localStorage.setItem('token',response?.data.token)
 console.log('add token' , response?.data.token);
 return redirect('/')
 
      }
     
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