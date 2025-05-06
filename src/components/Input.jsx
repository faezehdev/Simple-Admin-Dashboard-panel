import { useAppContext } from "../contexts/app/app-context";
import { useTranslation } from 'react-i18next';
const Input = ({ type, name, title, register, errors, validation, watch }) => {
  const {language , darkMode} = useAppContext()
    const {t} = useTranslation()
    const rules = typeof validation === 'function' ? validation(watch) : validation;
    return (
      <div className={`${errors[name] ? 'isInvalid' : ''} group/inputRow
       input-row w-full flex-col justify-start items-end gap-2 flex py-[.4em]`}>
        <label htmlFor={name} className={`font-${language === 'fa' ? 'IranSans400':'Roboto400'} 
         ${darkMode ? 'dark' : ''} [&.dark]:text-white  min-w-[100px] flex justify-end text-sm  font-normal text-fuchsia-700`}>
          :{title}
        </label>
  
        <input
          {...register(name, rules)}
          type={type}
          name={name}
          id={name}
          className={`group-[&.isInvalid]/inputRow:!border-red-600 group-[&.isInvalid]/inputRow:shadow-[2px_4px_14px_-4px_#ff1414] w-full border-[1px] border-fuchsia-300 rounded-[4px] outline-none h-[40px] shadow-[0px_1px_12px_0px_#ffdbed]
          bg-fuchsia-100 px-1.5 text-sm duration-150 focus:border-fuchsia-700 text-neutral-900
          font-${language === 'fa' ? 'IranSans400':'Roboto400'} font-normal`}
        />
  
        {errors[name] && (
          <span className={`text-red-500 font-${language === 'fa' ? 'IranSans400':'Roboto400'} Roboto400 font-normal text-xs`}>{errors[name]?.message}</span>
        )}
      </div>
    );
  };
  
  export default Input;
  