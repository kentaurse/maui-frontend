function Select(props) {
  const value = props.defaultValue;
  const { formState: { errors }, register } = props.hookForm;

  const cn = `border ${errors && errors[props.name] ? 'border-[#ff0000] focus:border-[#ff0000]' : 'border-[#dbe3eb] focus:border-[#008AEA]'} rounded-[3px] w-full h-[46px] p-3 outline-none mt-[13px] transition-all duration-500`;
  
  return (
    <div className={`mt-[18px] ${props.className || ''}`}>
      <div className="text-left font-medium text-[14px] leading-[16px] text-black">
        {props.label}
      </div>
      <select
        autoFocus={props.autoFocus}
        name={props.name}
        className={cn}
        {...register(props.name)}
      >
        <option value="">Select...</option>
        {
          props.data.map(item => (
            value === item.value ?
              <option key={item.value} value={item.value} selected>{item.title}</option>
            :
              <option key={item.value} value={item.value}>{item.title}</option>
          ))
        }
      </select>      
			{errors && errors[props.name] &&
        <div className="text-[#d71f28] text-xs mt-2">
          {errors[props.name]?.message}
        </div>
      }
    </div>
    
  );
}

export default Select;