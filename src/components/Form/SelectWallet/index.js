import { useState, useRef } from "react";
import _ from "lodash";
import Checkbox from "../Checkbox";
import useOutsideClick from "../../../utils/useOutsideClick";

const FIAT = [
  { img: "bg-common-debit-card", symbol: "Credit or Debit Card", fee: "3", index: 0 },
  { img: "bg-common-bank", symbol: "ACH Transfer", fee: "3", index: 1 },
];

const CRYPTO = [
  { img: "bg-common-debit-card", symbol: "Credit or Debit Card", fee: "3", index: 0 },
  { img: "bg-common-bank", symbol: "ACH Transfer", fee: "3", index: 1 },
  // {img: 'bg-common-debit-card', symbol: 'Apple Pay', fee: '3', index: 2 },
  // {img: 'bg-common-wallet-eth', symbol: 'Ethereum wallet', fee: '2'},
];

const getSelected = (isCrypto, selectedSymbol) => {
  let found = isCrypto ? CRYPTO[0] : FIAT[0];
  if (!selectedSymbol) return found;
  _.map(isCrypto ? CRYPTO : FIAT, (item) => {
    if (item.symbol === selectedSymbol) {
      found = { ...item };
    }
  });
  return found;
};
function SelectWallet({
  isCrypto = false,
  id,
  className,
  label,
  selectedSymbol,
  onChange,
}) {
  const [isCryptoOpen, setIsCryptoOpen] = useState(false);
  const [isFiatOpen, setIsFiatOpen] = useState(false);
  const selected = getSelected(isCrypto, selectedSymbol);
  const caret = !isCryptoOpen
    ? "bg-common-caret-up dark:bg-common-caret-up-dark"
    : "bg-common-caret-down dark:bg-common-caret-down-dark";
  const caretFiat = !isFiatOpen
    ? "bg-common-caret-up dark:bg-common-caret-up-dark"
    : "bg-common-caret-down dark:bg-common-caret-down-dark";

  const dropdown_crypto = _.map(CRYPTO, (item) => {
    return (
      <div
        key={item.symbol}
        title={item.desc}
        className={`cursor-pointer p-[3px] pl-[10px] pr-[10px] bg-[#DDE5F5] dark:bg-[#282828] hover:bg-[#8D95A5] dark:hover:bg-black hover:text-[#00DDA2] border border-[#F6F8FA] text-center ${
          selected.symbol !== item.symbol
            ? "text-black dark:text-white"
            : "text-[#00DDA2]"
        }`}
        onClick={handleDropdownSelect.bind(this, item.symbol)}
      >
        <div className="flex items-center p-3 justify-between">
          <div className={`${item.img} bg-cover bg-center w-[30px] h-[30px]`} />
          <div className="ml-[10px] text-[#767070] dark:text-[#CCCDCD] text-left">
            {item.symbol}
          </div>
          {/* <div className="text-right">{item.fee}% fee</div> */}
        </div>
      </div>
    );
  });

  const dropdown_fiat = _.map(FIAT, (item) => {
    return (
      <div
        key={item.symbol}
        title={item.desc}
        className={`cursor-pointer p-[3px] pl-[10px] pr-[10px] bg-[#DDE5F5] dark:bg-[#282828] hover:bg-[#8D95A5] dark:hover:bg-black hover:text-[#00DDA2] border border-[#F6F8FA] text-center ${
          selected.symbol !== item.symbol
            ? "text-black dark:text-white"
            : "text-[#00DDA2]"
        }`}
        onClick={handleDropdownSelect.bind(this, item.symbol)}
      >
        <div className="flex items-center p-3 justify-between">
          <div className={`${item.img} bg-cover bg-center w-[30px] h-[30px]`} />
          <div className="ml-[10px] text-[#767070] dark:text-[#CCCDCD] text-left">
            {item.symbol}
          </div>
          <div className="text-right">{item.fee}% fee</div>
        </div>
      </div>
    );
  });

  function handleOpen(e) {
    if (isCrypto) {
      setIsCryptoOpen(!isCryptoOpen);
    } else setIsFiatOpen(!isFiatOpen);
  }

  function handleDropdownSelect(symbol) {
    setIsCryptoOpen(false);
    onChange(symbol);
  }

  const ref = useRef();
  useOutsideClick(ref, () => {
    if (isCryptoOpen) {
      setIsCryptoOpen(false);
    }
    if (isFiatOpen) {
      setIsFiatOpen(false);
    }
  });

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="mb-[16px] ml-[16px]">{label}</div>}
      <div
        onClick={handleOpen}
        className="cursor-pointer relative flex p-[8px] pl-[15px] items-center rounded-[16px] border dark:border-transparent dark:border dark:border-[#1199FA] bg-white dark:bg-[#32283C] transition-all duration-1000"
      >
        <div
          className={`bg-cover bg-center ${selected.img} w-[30px] h-[30px]`}
        />
        <div className="ml-[10px] flex flex-col">
          <div
            className={`text-black dark:text-[#767070] text-[16px] transition-all duration-1000`}
          >
            {" "}
            {selected.symbol}{" "}
          </div>
          {/* <div className={`text-[#6B8CFF] text-[14px]`}>
            +{selected.fee}% fee
          </div> */}
        </div>
        {isCrypto ? (
          <div className="absolute right-[10px]">
            <div
              className={`${caret} bg-cover bg-center w-[15px] h-[15px] cursor-pointer`}
            />
          </div>
        ) : (
          <div className="absolute right-[10px]">
            <div
              className={`${caretFiat} bg-cover bg-center w-[15px] h-[15px] cursor-pointer`}
            />
          </div>
        )}
        {isCryptoOpen && (
          <div
            ref={ref}
            className={`absolute right-[5px] ${
              isCrypto ? "top-[45px] w-[350px]" : "bottom-[-180px]"
            } z-50 rounded-[5px] overflow-hidden`}
          >
            {dropdown_crypto}
          </div>
        )}
        {isFiatOpen && (
          <div
            ref={ref}
            className={`absolute right-[5px] ${
              isCrypto ? "top-[45px] w-[350px]" : "top-[45px] w-[350px]"
            } z-50 rounded-[5px] overflow-hidden`}
          >
            {dropdown_fiat}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectWallet;
