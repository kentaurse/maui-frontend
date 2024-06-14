import { useState } from "react";
import _ from "lodash";
import MaskedInput from 'react-text-mask';
import { Controller } from "react-hook-form";
import { CRYPTO } from "../SelectCurrency";
import { maskCurrency } from "../../../utils/masks";

const getSelected = (selectedCurrency) => {
  let found = CRYPTO[0];
  if (!selectedCurrency)
    return found;
  _.map(CRYPTO, item => {
    if (item.symbol === selectedCurrency) {
      found = {...item};
    }
  })
  return found;
}

function InputCryptoAmount({name, className, label, hookForm, validate, isCurrencySelectable = false, selectedCurrency = 'DAI', onCurrencyChange}) {
  const { formState: { errors }, control } = hookForm;
  const cn = `mt-[13px] border-1 dark:border ${errors && errors[name] ? 'border border-[#ff0000] focus:border-[#ff0000]' : 'border-[#1199FA] focus:border-[#1199FA]'} rounded-[13px] w-full h-[46px] p-3 pl-4 pr-4 outline-none bg-[#FFFFFF] dark:bg-transparent text-black dark:text-white dark:bg-[#32283C]`;

  const [isOpen, setIsOpen] = useState(false);
  const selected = getSelected(selectedCurrency);
  const caret = !isOpen ? 'bg-common-caret-up dark:bg-common-caret-up-dark' : 'bg-common-caret-down dark:bg-common-caret-down-dark'
  const dropdownList = isCurrencySelectable ? _.map(CRYPTO, item=>{
    return (<div
      key={item.symbol}
      title={item.desc}
      className={`cursor-pointer p-[3px] pl-[10px] pr-[10px] bg-[#232325] hover:bg-black hover:text-[#00DDA2] border border-[#62D1CD] text-center ${selected.symbol !== item.symbol?'text-white':'text-[#00DDA2]'}`}
      onClick={handleDropdownSelect.bind(this, item.symbol)}
    >
      {item.symbol}
    </div>)
  }) : [];
  
  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleDropdownSelect (symbol) {
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(symbol);
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {label}
      <Controller
        name={name}
        control={control}
        rules={{ validate: validate }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MaskedInput
            id={name}
            mask={maskCurrency}
            className={cn}
            value={value}
            placeholder="0.00"
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      
			{errors && errors[name] &&
        <div className="ml-[15px] text-[#d71f28] text-xs mt-2">
          {errors[name]?.message}
        </div>
      }
      {isCurrencySelectable ?
        <div
          className="absolute flex flex-row-reverse w-[60px] cursor-pointer text-right right-[10px] top-[49px] md:top-[53px]"
          onClick={handleOpen}
        >
          <div
            className={`${caret} bg-cover bg-center w-[15px] h-[15px] cursor-pointer`}
          />
          <div
            className="absolute right-[-3px] top-[-8px] rounded-[5px] border border-[#888888] p-[2px] pl-[10px] pr-[25px] pointer-events-none text-black dark:text-white"
          >{selectedCurrency}</div>
        </div>
        :
        <div className="absolute right-[10px] top-[45px] rounded-[5px] border border-[#888888] p-[2px] pl-[10px] pr-[10px] text-black dark:text-white ">{selectedCurrency}</div>
      }
      {isOpen && isCurrencySelectable && <div className={`absolute right-[5px] top-[75px] z-50 rounded-[5px] overflow-hidden`}>
        {dropdownList}
      </div>}
    </div>
  )
}

export default InputCryptoAmount;