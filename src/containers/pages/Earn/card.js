import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { Dec } from "@terra-money/terra.js";
import { Popover } from 'react-tiny-popover';

import Button from '../../../components/Button';
import InputAmount from '../../../components/Form/InputAmount';
import AgreeWithCheckbox from '../../../components/Form/AgreeWithCheckbox';
import { unmaskCurrency } from '../../../utils/masks';
import { apiHistoryRecord, apiEarnDeposit } from '../../../saga/actions/workflow';
import { appConfig } from '../../../appConfig';
import { CURRENCY_USD, HISTORY_EARN_DEPOSIT, HISTORY_EARN_WITHDRAW } from '../../../utils/appConstants';

function Cards (props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	// get functions to build form with useForm() hook
  const hookForm = useForm();
	const { handleSubmit, setValue } = hookForm;
  // set initial values
  useEffect(() => {
    setValue('amount', 0);
  }, [setValue]);
  
  const [ isAgreed, setIsAgreed ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  
  const resetForm = () => {
    setValue('amount', 0);
    setIsAgreed(false);
  }
  
  function handleAgreeChange(e) {
    setIsAgreed(e.target.checked);
  }

  function validateAmount(val) {
    const value = unmaskCurrency(val);
    if (!value) {
      return 'This input field is required.';
    }
    if (!props.isDeposit) {
      if ( Number(value) > new Dec(props.austVal).mul(props.marketExchangeRate).div(appConfig.MICRO) ) {
        return 'Not enough deposit';
      }
    } else {
      if ( Number(value) > Number(props.workflow.balance) ) {
        return 'Insufficient balance';
      }
    }
    return null;
  }

  function handleDepositHelpClick(e) {
    setIsPopoverOpen(!isPopoverOpen);
  }

  // handle functions
	const onSubmit = (data) => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    setIsLoading(true);
    const amount = unmaskCurrency(data.amount);
    props.apiEarnDeposit({
      url: props.isDeposit ? '/deposit' : '/withdraw',
      method: 'POST',
      data: {
        amount: amount,
        network: props.workflow.network,
      },
      success: (response) => {
        props.apiHistoryRecord({
          url: '/recordHistory',
          method: 'POST',
          data: {
            type: props.isDeposit ? HISTORY_EARN_DEPOSIT : HISTORY_EARN_WITHDRAW,
            terraAddress: props.workflow.terraAddress,
            mauiAddress: props.workflow.mauiAddress,
            amount: amount,
            currency: CURRENCY_USD,
            network: `${props.workflow.network.name}:${props.workflow.network.chainID}`,
            note: 'DONE',
          },
          success: (res) => {
            console.log('recordSuccess', res);
          },
          fail: (error) => {
            console.log('recordError', error);
          }
        });
        setIsLoading(false);
        props.handleAfterSubmit();
        resetForm();
        toast.success("Transaction success");
      },
      fail: (error) => {
        props.handleAfterSubmit();
        console.log('error', error);
        setIsLoading(false);
        toast.error("Transaction fail");
      }
    })
		return false;
	}

  return (
    <form name={props.name} id={props.name} className='w-full bg-earn-card rounded-[40px] p-[20px] md:p-[30px] md:pl-[50px] border dark:border-[#FFFFFF30]' onSubmit={handleSubmit(onSubmit)}>
      { props.isDeposit ?
        <div className='font-semibold pl-4 md:pl-0 text-[14px] md:text-[24px] text-[#273855] dark:text-[#F9D3B4]'>Enter an amount for 5% APY
          <Popover
            containerClassName='z-[999999] pl-[20px]'
            isOpen={isPopoverOpen}
            positions={['top']} // preferred positions by priority
            align={'center'}
            padding={2}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
              <>
                <div className='rounded-md border border-[#00214732] p-5 bg-[#ffffff] m-auto max-w-[90%] md:max-w-[600px] max-h-[500px] overflow-y-auto text-[#3f556e] text-[14px] scrollbar'>
                  <p>When you deposit your money for 5% APY deposit, we deduct 4.167% for Maui fee to get it ensured transaction with Anchor protocol for the first 15 days, from when you can withdraw your original deposit freely.</p>
                </div>
                <span className='arrow left-2 hidden md:block' />
              </>
            }
          >
            <span className='ml-[10px] text-[#1199FA] cursor-pointer underline' onClick={handleDepositHelpClick}>Deposit</span>
          </Popover>
        </div>
      :
        <div className='font-semibold pl-4 md:pl-0 text-[14px] md:text-[24px] text-[#273855] dark:text-[#F9D3B4] flex justify-between'>How much would you like to <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#FF0000FF] to-[#FF000010]'>Withdraw</span> ?</div>
      }
      
      <InputAmount
        name="amount"
        className="mt-[30px]"
        label={<div className='ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[16px] transition-all duration-1000'>Enter amount</div>}
        hookForm={hookForm}
        validate={validateAmount}
      />
      <AgreeWithCheckbox
        className="ml-2 md:ml-4 mb-3 mt-[30px]"
        checked={isAgreed}
        onChange={handleAgreeChange}
        position="right"
        align="center"
      />
      <Button
        type="submit"
        isDisabled={!isAgreed}
        isLoading={isLoading}
        className={`${props.isDeposit ? 'bg-deposit-card-btn': 'bg-earn-withdraw-card-btn'} shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full mt-[20px]`}
      >
        {props.isDeposit ? 'Deposit' : 'Withdraw'}
      </Button>
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
      apiEarnDeposit
    }
  )
)(Cards);