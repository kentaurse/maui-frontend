import MaskedInput from 'react-text-mask';
import { Controller } from "react-hook-form";

function Input({isMasked = false, autoFocus = false, name, className, label, hookForm, validate, placeholder, registerOptions}) {
  const { formState: { errors }, register, control } = hookForm;
  const cn = `border-0 dark:border ${errors && errors[name] ? 'border-[1px] border-[#ff0000] focus:border-[#ff0000]' : 'border-[#1199FA] focus:border-[#1199FA]'} rounded-[13px] w-full h-[46px] p-3 outline-none mt-[13px] bg-[#FFFFFF] dark:bg-transparent text-black dark:text-white dark:bg-[#32283C] transition-all duration-500`;

  return (
    <div className={`${className || ''}`}>
      {label && <div className="text-left font-medium text-[14px] leading-[16px] text-[#000A2F] tracking-tight	">
        {label}
      </div>}
      {isMasked &&
        <Controller
          name={name}
          control={control}
          rules={{ validate: validate }}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedInput
              id={name}
              mask={isMasked}
              className={cn}
              value={value}
              placeholder={placeholder || ''}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      }
      {!isMasked &&
        <input
          autoFocus={autoFocus}
          id={name}
          name={name}
          type="text"
          className={cn}
          {...register(name, registerOptions)}
        />
      }
			{errors && errors[name] &&
        <div className="ml-[15px] text-[#d71f28] text-xs mt-2">
          {errors[name]?.message}
        </div>
      }
    </div>
    
  );
}

export default Input;