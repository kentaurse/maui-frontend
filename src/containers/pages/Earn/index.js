import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dec } from "@terra-money/terra.js";

import { updateBalance } from '../../../saga/actions/workflow';
import { fetchExpectedInterest } from '../../../utils/wallet';
import AnimatedTab from '../../../components/AnimatedTab';
import Card from './card';
import ImgVideoBanner from '../../../components/ImgVideoBanner';

function Earn(props) {
  const [ timePeriod, setTimePeriod ] = useState('year');
  const [expectedInterest, setExpectedInterest] = React.useState(0);
  const [annualExpectedInterest, setAnnaulExpectedInterest] = React.useState(0);
  const [depositedAmount, setDepositedAmount] = React.useState(0);
  const [austVal, setAustVal] = React.useState(0);
  const [marketExchangeRate, setMarketExchangeRate] = React.useState(1);
  const isLogged = props.workflow.isLogged;
  const mauiAddress = props.workflow.mauiAddress;
  const network = props.workflow.network;
  useEffect(() => {
    if (isLogged) {
      console.log('fetchExpectedInterest....');
      fetchExpectedInterest(mauiAddress, network, callbackFetchExpectedInterest);
    }
  }, [isLogged, mauiAddress, network]);
  useEffect(() => {
    setExpectedInterest(
      new Dec(annualExpectedInterest)
        .div(timePeriod === 'month' ? 12 : timePeriod === 'week' ? 52 : timePeriod === 'day' ? 365 : 1)
        .toNumber()
        .toFixed(2),
    );
  }, [timePeriod, annualExpectedInterest]);
  const TABS_TIME = [
    {title: 'Year', value: 'year'},
    {title: 'Month', value: 'month'},
    {title: 'Week', value: 'week'},
    {title: 'Day', value: 'day'},
  ];
  function handleTimeChange(val) {
    setTimePeriod(val);
  }
  function handleAfterSubmit() {
    // console.log('handleAfterSubmit called');
    if (!isLogged)
      return;
    props.updateBalance(mauiAddress);
    fetchExpectedInterest(mauiAddress, network, callbackFetchExpectedInterest);
  }

  function callbackFetchExpectedInterest({exchangeRate, austVal, annualExpectedInterest, depositedAmount}) {
    setMarketExchangeRate(exchangeRate);
    setAustVal(austVal);
    setAnnaulExpectedInterest(annualExpectedInterest);
    setDepositedAmount(depositedAmount);
  }

  return (
    <div className='relative w-full min-h-[1610px] md:min-h-[1270px] bg-[#DEE2E8] dark:bg-[#32283C]'>
      {/* bg images */}
      <div className='bg-earn-rightbottom bg-center bg-cover absolute left-0 top-0 w-[360px] h-[270px] md:w-[1024px] md:h-[768px]'></div>
      <div className='bg-earn-rightbottom bg-center bg-cover absolute right-0 bottom-0 w-[360px] h-[270px] md:w-[1024px] md:h-[768px]'></div>
      <span className='absolute top-[100px] w-full text-center block md:hidden font-semibold text-[40px] leading-[48px] tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>EARN</span>
      {/* card */}
      <div className='absolute w-[350px] top-[160px] left-[calc(50%-175px)] md:w-[1020px] md:top-[250px] md:left-[calc(50%-510px)] bg-deposit-card dark:bg-deposit-card-dark shadow-stocks-card dark:shadow-stocks-card-dark border border-[#FFFFFF] dark:border-[#000000] rounded-[33px] p-[25px]'>
        <div className='w-full flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-[60%]'>
            <Card name='frmDeposit' isDeposit={true} handleAfterSubmit={handleAfterSubmit}/>
            <div className='h-[30px]'></div>
            <Card name='frmWithdraw' isDeposit={false} handleAfterSubmit={handleAfterSubmit} austVal={austVal} marketExchangeRate={marketExchangeRate}/>
          </div>
          <div className='w-full md:w-[35%]'>
            <div className='mt-[20px] w-full bg-earn-right-panel dark:bg-earn-right-panel-dark border border-[#FFFFFF] dark:border-[#FFFFFF34] rounded-[20px] p-[20px]'>
              <div className='flex items-center justify-center'>
                <div className='text-[#707070] dark:text-[#F9D3B4] text-[12px] md:text-[14px]'>AVAILABLE USD</div>
                <div className='w-[100px] ml-[20px] rounded-[14px] border border-[#728AB7] p-[2px] pl-[13px] pr-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] text-[12px] md:text-[14px]'>{props.workflow.balance || 0}</div>
              </div>
              <div className='flex items-center justify-center mt-[15px]'>
                <div className='text-[#707070] dark:text-[#F9D3B4] text-[12px] md:text-[14px]'>YIELD DEPOSIT USD</div>
                <div className='w-[100px] ml-[20px] rounded-[14px] border border-[#728AB7] p-[2px] pl-[13px] pr-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] text-[12px] md:text-[14px]'>{depositedAmount}</div>
              </div>
            </div>
            <div className='mt-[30px] md:mt-[130px] text-center bg-deposit-card dark:bg-deposit-card-dark shadow-earn-panel dark:shadow-earn-panel-dark border border-[#FFFFFF30] dark:border-[#1199FA20] rounded-[26px] p-[25px]'>
              <span className='font-semibold text-[16px] md:text-[24px] leading-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#39C6D9] via-[#B84ADE] to-[#DE1F4D]'>
                Earn with 5% APY
              </span>
              <div className='mt-[20px]'>
                <ImgVideoBanner
                  img="bg-earn-banner"
                  video="/earn.mp4"
                  description={
                    <div>
                      <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Earn</span> on your deposits. Withdraw anytime.
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row justify-between mt-[30px] mb-[10px]'>
          <div className='w-full md:w-[60%] flex md:flex-row-reverse'>
            <div className='w-full md:w-[80%]'>
              <div className='ml-[15px] text-[#273855] font-semibold dark:text-[#1199FA] text-[16px] md:text-[24px] transition-all duration-1000'>Your Expected Earnings</div>
              <div className='mt-[10px] flex items-center justify-between rounded-[12px] shadow-earn-expected-card dark:shadow-earn-expected-card-dark bg-[#ECECF9] dark:bg-[#271B2D] text-[16px] md:text-[20px] p-[15px] pl-[20px] pr-[20px]  font-medium text-[#000000] dark:text-[#FFFFFF]'>
                <div className=''>{expectedInterest}</div>
                <div className=''>USD</div>
              </div>
            </div>
          </div>
          <div className='w-full mt-[20px] md:mt-[0px] md:w-[35%]'>
            <div className='mb-[10px] ml-[35px] text-[#273855] dark:text-[#FFFFFF80] text-[16px]'>Choose time period:</div>
            <AnimatedTab tabs={TABS_TIME} onChange={handleTimeChange} selected={timePeriod} className="p-[6px] md:p-[16px]"/>
          </div>
        </div>
        {/* <div className='mt-[50px] w-[80%] ml-[10%]'>
          <div className='text-[#5A5A5A] dark:text-[#F9D3B4] text-[14px]'>Expected <strong>APY</strong> based on your deposit</div>
          <div className=' flex flex-col justify-center items-center'>
            <div className='bg-earn-chart bg-cover bg-center w-[690px] h-[252px]'></div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      workflow: state.workflow
    }),
    {
      updateBalance
    }
  )
)(Earn);