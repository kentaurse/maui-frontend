import { useState, useRef } from "react";
import _ from "lodash";
import useOutsideClick from "../../../../utils/useOutsideClick";

export const FIAT = [
  {img: 'bg-common-fiat-usd', symbol: 'USD', desc: 'USA Dollar'},
  {img: 'bg-common-fiat-euro', symbol: 'EUR', desc: 'Euro'},
  // {img: 'bg-common-fiat-usd', symbol: 'SGD', desc: 'Singapore Dollar'},
  // {img: 'bg-common-fiat-usd', symbol: 'CAD', desc: 'Canada Dollar'},
  // {img: 'bg-common-fiat-usd', symbol: 'AUD', desc: 'Australia Dollar'},
  // {img: 'bg-common-fiat-usd', symbol: 'BRL', desc: 'Brazilian Real'},
];

export const CRYPTO = [
  {img: 'bg-common-crypto-dai', symbol: 'DAI', desc: 'DAI', rate: '1.00'},
  {img: 'bg-common-crypto-btc', symbol: 'BTC', desc: 'Bitcoin', rate: '45,000.87'},
  {img: 'bg-common-crypto-usdc', symbol: 'USDC', desc: 'Bitcoin', rate: '1.00'},
  // {img: 'bg-common-crypto-sbu', symbol: 'SBU', desc: 'Shibu', rate: '45,000.87'},
  // {img: 'bg-common-crypto-mtc', symbol: 'MTC', desc: 'Matic', rate: '45,000.87'},
  // {img: 'bg-common-crypto-swrv', symbol: 'SWRV', desc: 'Swerve', rate: '45,000.87'},
  {img: 'bg-common-crypto-eth', symbol: 'ETH', desc: 'Ethereum', rate: '45,000.87'},
  // {img: 'bg-common-crypto-chat', symbol: 'CHAT', desc: 'ChatCoin', rate: '45,000.87'},
];


const getSelected = (isCrypto, selectedSymbol) => {
  let found = isCrypto ? CRYPTO[0]: FIAT[0];
  if (!selectedSymbol)
    return found;
  _.map(isCrypto ? CRYPTO : FIAT, item => {
    if (item.symbol === selectedSymbol) {
      found = {...item};
    }
  })
  return found;
}
function SelectAsset({isCrypto = false, id, className, label, selectedSymbol, onChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = getSelected(isCrypto, selectedSymbol);
  const caret = !isOpen ? 'bg-common-caret-up dark:bg-common-caret-up-dark' : 'bg-common-caret-down dark:bg-common-caret-down-dark'
  const dropdown_fiat = _.map(FIAT, item=>{
    return (<div
      key={item.symbol}
      title={item.desc}
      className={`cursor-pointer p-[3px] pl-[10px] pr-[10px] bg-[#DDE5F5] dark:bg-[#282828] hover:bg-[#8D95A5] dark:hover:bg-black hover:text-[#00DDA2] border border-[#F6F8FA] text-center ${selected.symbol !== item.symbol?'text-black dark:text-white':'text-[#00DDA2]'}`}
      onClick={handleDropdownSelect.bind(this, item.symbol)}
    >
      <div className="flex items-center justify-evenly">
        <div className={`${item.img} bg-cover bg-center w-[30px] h-[30px]`} />
        <div className="flex flex-col w-[40%]">
          <div className="text-[#767070] dark:text-[#CCCDCD]">{item.symbol}</div>
          <div className="text-black dark:text-white">{item.desc}</div>
        </div>
        <div className="w-[40%] text-right">
          {/* {`${item.rate} usd`} */}
        </div>
      </div>
    </div>)
  })
  const dropdown_crypto = _.map(CRYPTO, item=>{
    return (<div
      key={item.symbol}
      title={item.desc}
      className={`cursor-pointer p-[3px] pl-[10px] pr-[10px] bg-[#DDE5F5] dark:bg-[#282828] hover:bg-[#8D95A5] dark:hover:bg-black hover:text-[#00DDA2] border border-[#F6F8FA] text-center ${selected.symbol !== item.symbol?'text-black dark:text-white':'text-[#00DDA2]'}`}
      onClick={handleDropdownSelect.bind(this, item.symbol)}
    >
      <div className="flex items-center justify-evenly">
        <div className={`${item.img} bg-cover bg-center w-[30px] h-[30px]`} />
        <div className="flex flex-col w-[40%]">
          <div className="text-[#767070] dark:text-[#CCCDCD]">{item.symbol}</div>
          <div className="text-black dark:text-white">{item.desc}</div>
        </div>
        <div className="w-[40%] text-right">
          {/* {`${item.rate} usd`} */}
        </div>
      </div>
    </div>)
  })
  
  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleDropdownSelect (symbol) {
    setIsOpen(false);
    onChange(symbol);
  }

  const ref = useRef();
  useOutsideClick(ref, () => {
    if(isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="mb-[16px] ml-[16px]">{label}</div>}
      <div
        onClick={handleOpen}
        className="relative cursor-pointer flex p-[8px] pl-[15px] items-center rounded-[16px] border dark:border-transparent dark:border dark:border-[#1199FA] bg-white dark:bg-[#32283C] transition-all duration-1000"
      >
        <div className={`bg-cover bg-center ${selected.img} w-[30px] h-[30px]`} />
        <div className={`ml-[10px] text-black dark:text-[#767070] text-[16px] transition-all duration-1000`}> {selected.symbol} </div>
        <div className={`ml-[10px] text-[#CCCDCD] text-[14px]`}> { isCrypto ? `(${selected.desc})` : selected.desc} </div>
        <div className="absolute right-[10px]">
          <div className={`${caret} bg-cover bg-center w-[15px] h-[15px]`} />
        </div>
        {isOpen && <div ref={ref} className={`absolute right-0 md:right-[5px] ${isCrypto? 'top-[45px] w-[100%] md:w-[350px]': 'top-[45px] w-[100%] md:w-[350px]'} z-50 rounded-[5px] overflow-hidden`}>
          {isCrypto ? dropdown_crypto : dropdown_fiat}
        </div>}
      </div>
    </div>
  )
}

export default SelectAsset;