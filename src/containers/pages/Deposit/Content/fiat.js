import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import transakSDK from "@transak/transak-sdk";

import { appConfig } from '../../../../appConfig';
import InputAmount from '../../../../components/Form/InputAmount';
import SelectCurrency from '../../../../components/Form/SelectCurrency';
import SelectWallet from '../../../../components/Form/SelectWallet';
import { unmaskCurrency } from '../../../../utils/masks';
import Button from '../../../../components/Button';
import AgreeWithCheckbox from '../../../../components/Form/AgreeWithCheckbox';
import RightBar from './rightbar';
import { CURRENCY_EUR, HISTORY_DEPOSIT_FIAT } from '../../../../utils/appConstants';
import { apiHistoryRecord, updateBalance } from '../../../../saga/actions/workflow';

let preventSeveralCalling = false;
function TabFiat (props) {
  // get functions to build form with useForm() hook
  const hookForm = useForm();
	const { handleSubmit, setValue } = hookForm;
  // set initial values
  useEffect(() => {
    setValue('amount', 0);
  }, [props.data, setValue]);

  const [ isAgreed, setIsAgreed ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ selectedFiat, setSelectedFiat ] = useState('EUR');
  const [ selectedFiatWallet, setSelectedFiatWallet ] = useState('EUR');

  const depositFiat = (amount, to) => {
    setIsLoading(true);
    preventSeveralCalling = false;
    let transak = new transakSDK({
      apiKey: appConfig.transakAPIKey, // Your API Key
      environment: "PRODUCTION", // STAGING/PRODUCTION
      defaultCryptoCurrency: "UST",
      network: "terra",
      walletAddress: to, // Your customer's wallet address
      themeColor: "#536DFE", // App theme color
      fiatCurrency: "EUR", // INR/GBP // ----------vdg
      fiatAmount: amount,
      // email: "", // Your customer's email address
      redirectURL: "",
      hostURL: window.location.origin,
      widgetHeight: "550px",
      widgetWidth: "450px",
    });

    transak.init();
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (offerData) => {
      if (preventSeveralCalling)
        return;
      preventSeveralCalling = true;
      setIsLoading(false);
      resetForm();
      props.updateBalance(to);
      props.apiHistoryRecord({
        url: '/recordHistory',
        method: 'POST',
        data: {
          type: HISTORY_DEPOSIT_FIAT,
          terraAddress: props.workflow.terraAddress,
          mauiAddress: to,
          currency: CURRENCY_EUR,
          note: 'PENDING',
        },
        success: (res) => {
          console.log('recordSuccess', res);
        },
        fail: (error) => {
          console.log('recordError', error);
        }
      });
      transak.close();
    });
  };

  function handleFiatChange(symbol) {
    setSelectedFiat(symbol);
  }
  function handleFiatWalletChange(symbol) {
    setSelectedFiatWallet(symbol);
  }
  function handleAgreeChange(e) {
    setIsAgreed(e.target.checked);
  }
  function validateAmount(val) {
    const value = unmaskCurrency(val);
    if (!value) {
      return 'This input field is required.';
    } else if (parseInt(value) <= 0 || parseInt(value) > 99999){
      return 'The amount must be between $0.1 and $99,999';
    }
    return null;
  }
  // handle functions
  const resetForm = () => {
    setValue('amount', 0);
    setIsAgreed(false);
  }
	const onSubmit = (data) => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    const to = props.workflow.mauiAddress;
    depositFiat(unmaskCurrency(data.amount), to);
		return false;
	}
  return (
    <form className='flex p-10 md:p-20 flex-col-reverse md:flex-row justify-between' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full md:w-[45%]'>
        <SelectCurrency
          isCrypto={false}
          className="mt-[40px] md:mt-[10px]"
          label={<div className='text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000'>Select currency and payment method</div>}
          selectedSymbol={selectedFiat}
          onChange={handleFiatChange}
        />
        <div className='h-[30px]'></div>
        <SelectWallet
          isCrypto={false}
          className="mt-[10px]"
          label={<div className='text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000'>Bank transfer <span className='text-[#888888]'>(reccomended)</span></div>}
          selectedSymbol={selectedFiatWallet}
          onChange={handleFiatWalletChange}
        />
        <InputAmount
          name="amount"
          className="mt-[40px]"
          label={<div className='ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000'>Enter amount</div>}
          selectedCurrency="EUR"
          hookForm={hookForm}
          validate={validateAmount}
        />
        {/* <div className='ml-5 mt-[30px]'>
          <div className='flex text-[14px] items-center'>
            <div className='text-[#6B8CFF]'>Fee</div>
            <div className='ml-[10px] text-black dark:text-white text-[16px] font-semibold'>4</div>
          </div>
          <div className='flex text-[14px] items-center'>
            <div className='text-[#6B8CFF]'>You will get</div>
            <div className='ml-[10px] text-black dark:text-white text-[16px] font-semibold'>196</div>
          </div>
        </div> */}
        <AgreeWithCheckbox
          className="ml-2 md:ml-4 mb-3 mt-[30px]"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        <Button
          type="submit"
          isDisabled={!isAgreed}
          isLoading={isLoading}
          className='mt-[10px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full'
        >
          Deposit
        </Button>
      </div>
      <div className='w-full mt-[10px] md:mt-0 md:w-[45%]'>
        <RightBar isCrypto={false} />
      </div>
    </form>
  )
}

export default compose(
  connect(
    state => ({
      workflow: state.workflow
    }),
    {
      apiHistoryRecord,
      updateBalance
    }
  )
)(TabFiat);