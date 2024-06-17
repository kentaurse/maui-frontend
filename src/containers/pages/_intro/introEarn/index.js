import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Earth from "../../../../components/Earth";
import EarthMobile from "../../../../components/EarthMobile";
import useWindowSize from "../../../../utils/useWindowSize";
// import functionPlot from 'function-plot';
import CustomSlider from './slider';
import SelectAsset from "./selectAsset";
import InputAmount from "../../../../components/Form/InputAmount";
import { useForm } from "react-hook-form";
import { unmaskCurrency } from "../../../../utils/masks";
import AnimatedTab from "../../../../components/AnimatedTab";
import Button from "../../../../components/Button";
import EarnChart from "./EarnChart";

function IntroEarn() {
  const size = useWindowSize();

  const [isMobile, setIsMobile] = useState(false);
  const [isExplore, setIsExplore] = useState(false);
  const [enterEarth, setEnterEarth] = useState(false)
  const [earthToCorner, setEarthToCorner] = useState(false);

  const [asset, setAsset] = useState('DAI');

  // Input Asset Set up
  const hookForm = useForm();
  const { handleSubmit, setValue } = hookForm;

  function validateAmount(val) {
    const value = unmaskCurrency(val);
    if (!value) {
      return "This input field is required.";
    } else if (parseInt(value) <= 5 || parseInt(value) > 99999) {
      return "The amount must be greater than $5 and be less than $100000";
    }
    return null;
  }

  // Print current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const yearDates = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5, currentYear + 6, currentYear + 7, currentYear + 8, currentYear + 9, currentYear + 10];
  const monthDates = [currentMonth, currentMonth + 1, currentMonth + 2, currentMonth + 3, currentMonth + 4, currentMonth + 5, currentMonth + 6, currentMonth + 7, currentMonth + 8, currentMonth + 9, currentMonth + 10];
  
  // convert monthDates to month names
  const monthNames = monthDates.map((month) => {
    if (month > 12) {
      return new Date(2021, month - 12, 1).toLocaleString('default', { month: 'long' });
    } else {
      return new Date(2020, month, 1).toLocaleString('default', { month: 'long' });
    }
  });


  // Time Period Tab Set up
  const TABS_TIME = [
    {title: 'Year', value: 'year'},
    {title: 'Month', value: 'month'},
  ];
  const [ timePeriod, setTimePeriod ] = useState('year');
  const [deposit, setDeposit] = useState(1000);

  function handleTimeChange(val) {
    setTimePeriod(val);
  }
  // const [zoom]

  // Calculate 10 year expected Earnings
  // var expectedEarnings = deposit * (1 + apy) ** 10;


  useEffect(() => {
    window.scrollTo(0, 0);
    setEnterEarth(true);
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    if (size.width <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [size]);

  useEffect(() => {
    if (!isExplore) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setEarthToCorner(true);
    }
  }, [isExplore]);

  function calculateEarnings() {
    var apy = 0.05;
    // deposit = document.getElementById('amount').value;   
    if (asset == 'DAI' || asset == 'USDC' || asset == 'USDT') {
      apy=0.05;
    } else {
      apy=0.03;
    }
    var depositValue= document.getElementById('amount').value;
    // remove commas from depositValue
    depositValue = depositValue.replace(/,/g, '');
    parseInt(depositValue)
    console.log(depositValue)
    var expectedEarnings = depositValue * (1 + apy) ** 10;
    document.getElementById('ExpectedEarnings').innerHTML = '$'+parseInt(expectedEarnings);

    setDeposit(depositValue);
    console.log(document.getElementById('SelectAsset'));
    if (deposit>1) {
    return deposit;
    }
    else {
      return 1000;
    }
  }

  const handleChanged = (collateral, borrowed, apy) => {
    const width = isMobile ? 175 : 370;
    const height = isMobile ? 135 : 270;
    // console.log('val', collateral, borrowed, apy);
  //   functionPlot({
  //     target: "#plot",
  //     width: width,
  //     height: height,
  //     yAxis: {
  //       label: "Remaining Debt",
  //       domain: [0, 50],
  //       color: '#FFFFFF',
  //     },
  //     xAxis: {
  //       label: "X axis",
  //       domain: [0, 30],
  //     },
  //     data: [
  //       {
  //         fn: `(${(-collateral / 1200) * apy}x + ${borrowed}) / 1000`,
  //       },
  //     ],
  //     disableZoom: true,
  //   });
  };

  return !isExplore ? (
    <div className="w-full">
      <div className="w-full h-[100vh] bg-[#10213f] bg-introearn-starsstart bg-contain bg-left bg-no-repeat overflow-hidden">
        {!isMobile && (<div className="md:h-[35vh]"></div>)}
        <div className="relative flex justify-start ml-[8%] md:ml-[15%] md:text-[250px] md:leading-[298px] md:font-[600]">
          {!isMobile && (
            <CSSTransition
              in={enterEarth}
              timeout={1000}
              classNames={{
                enter: "top-[-350px] right-[-250px] scale-[1.5]",
                enterActive: "top-[000px] right-[250px] scale-[0.5] duration-[1000ms]",
                enterDone: "top-[000px] right-[50px] scale-[2.0] duration-[3000ms]"
              }}
            >
              <Earth className="absolute scale-[1.5] transition-all duration-[1000ms]" />
            </CSSTransition>
          )}
          <TransitionGroup>
            {isMobile && (
              <CSSTransition
                in={enterEarth}
                timeout={1000}
                classNames={{
                  enter: "top-[000px] right-[-10vw] scale-[0.3]",
                  enterActive: "top-[000px] right-[-5vw] scale-[0.5] duration-[1000ms]",
                  enterDone: "top-[000px] right-[-25vw] scale-[1.5] duration-[3000ms]"
                }}
              >
                <EarthMobile className="absolute scale-[0.3] right-[-10vw] top-[35vh] transition-all duration-[1000ms]" />
              </CSSTransition>
            )}
          </TransitionGroup>
          {!isMobile && (
            <CSSTransition
              in={enterEarth}
              timeout={1000}
              classNames={{
                enter: "md:text-[24px] md:leading-[29px]",
                enterActive: "md:text-[24px] md:leading-[29px]",
                enterDone: "md:text-[250px] md:leading-[280px]",
              }}
            >
              <span className="text-transparent text-[64px] md:text-[24px] leading-[76px] md:leading-[29px] font-[600] md:bg-introearn-title-gradient md:bg-clip-text transition-all duration-[2000ms]">EARN</span>
            </CSSTransition>
          )}
          <TransitionGroup>
            {isMobile && (
              <CSSTransition
                in={enterEarth}
                timeout={1000}
                classNames={{
                  enter: "text-[4px] md:leading-[29px]",
                  enterActive: "text-[24px] md:leading-[29px]",
                  enterDone: "text-[60px] top-[45vh] md:leading-[280px]",
                }}
              >
                <span className="relative text-white text-[4px] top-[10vh] leading-[76px] md:leading-[29px] font-[600] md:bg-introearn-title-gradient md:bg-clip-text transition-all duration-[2000ms]">EARN</span>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
        {!isMobile && (
          <div
            className="absolute left-[18%] top-[calc(35vh+290px)] opacity-0 w-[128px] md:w-[200px] h-[54px] md:h-[61px] flex items-center justify-center text-[#FFF] text-[20px] md:text-[30px] leading-[24px] md:leading-[36px] font-[600] md:font-[500] border-[1px] border-[#FFF] cursor-pointer md:animate-display1"
            onClick={() => setIsExplore(true)}
          >
            Explore
            <div className="bg-introearn-down-arrow bg-cover bg-center md:w-[44.17px] md:h-[44.17px] md:ml-[10px]"></div>
          </div>
        )}
        {isMobile && (
          <div
            className="absolute left-[11%] top-[57vh] opacity-0 w-[128px] md:w-[200px] h-[54px] md:h-[61px] flex items-center justify-center text-[#FFF] text-[20px] md:text-[30px] leading-[24px] md:leading-[36px] font-[600] md:font-[500] border-[1px] border-[#FFF] cursor-pointer animate-display1"
            onClick={() => setIsExplore(true)}
          >
            Explore
            <div className="bg-introearn-down-arrow bg-cover bg-center md:w-[44.17px] md:h-[44.17px] md:ml-[10px]"></div>
          </div>
        )}
      </div>
      <div className="w-full bg-[#10213f]">
        <div className="relative mx-auto pt-[30px] md:pt-[70px] w-[96%] md:w-[80%] md:border-[1px] md:border-[rgba(0,0,0,0.21)]">
          {/* <div className="flex flex-row justify-around px-[2%]">
            <div className="text-[32px] md:text-[64px] leading-[38px] md:leading-[76px] font-[500] text-[#FFF]">
              Credit Analysis
            </div>
            {!isMobile && (
              <div className="md:text-[24px] md:leading-[29px] md:font-[500] text-[rgba(255,255,255,0.94)]">
                <div>
                  Your yield{" "}
                  <span className="text-transparent md:bg-introborrow-calculate-gradient md:bg-clip-text">
                    self Repays
                  </span>{" "}
                  your loan
                </div>
                <div className="md:mt-[20px] mx-auto flex flex-col justify-between md:w-[228px] md:h-[140px] md:rounded-[6px] border-[1px] border-[rgba(255,255,255,0.62)] md:px-[16px] md:py-[24px]">
                  <div className="flex justify-between">
                    <div className="md:text-[16px] md:leading-[24px] md:max-w-[48%] md:font-[400] text-[#fff] flex items-end">
                      Duration:{" "}
                    </div>
                    <div className="md:text-[16px] md:leading-[24px] md:font-[400] text-[#1BA9EA] flex items-end">
                      365 Days{" "}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="md:text-[16px] md:leading-[24px] md:max-w-[48%] md:font-[400] text-[#fff] flex items-end">
                      Maturity Date:
                    </div>
                    <div className="md:text-[16px] md:leading-[24px] md:font-[400] text-[#1BA9EA] flex items-end">
                      03.12.2023
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isMobile && (
              <div className="w-[31.5px] h-[31.5px] bg-introdashboard-fullscreenimage bg-cover bg-center"></div>
            )}
          </div> */}
          {/* <div className='relative w-full flex flex-col md:flex-row justify-center p-[20px]'>
            <div className='text-center w-full p-[20px] flex flex-col justify-center items-center'>
              <div>
                <div className='text-left pl-[10px] text-[14px] md:text-[24px] text-[#000] dark:text-[#EFEFFA]'><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Zero</span> Repayments</div>
                <div className='mt-[20px] w-[200px] h-[150px] md:w-[400px] md:h-[300px] rounded-[14px] border-[4px] border-[#797476] bg-[#2c2930]'>
                  <div className='rounded-[18px] w-[200px] h-[150px] md:w-[400px] md:h-[300px]' id="plot"></div>
                </div>
              </div>
            </div>
            <div className='text-center w-full p-[20px] md:p-[40px] flex flex-col justify-center items-center'>
              <div>
                <div className='text-[14px] md:text-[16px] text-[#000] dark:text-[#EFEFFA]'>Borrow <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9] md:text-[16px] text-[24px]'>Permissionless</span> and <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#39C6D9] to-[#00DDA2] text-[16px] md:text-[24px]'>Instantly</span></div>
              </div>
              <div className='mt-[20px] w-[250px] md:w-[350px] h-[300px] rounded-[14px] border-[4px] border-[#797476] bg-[#2c2930]'>
                <CustomSlider
                  onChange={handleChanged}
                />
              </div>
            </div>
          </div> */}
          {/* <div className="mt-[50px] w-[96vw] md:w-[80vw] h-[calc(96vw*343/1168)] md:h-[calc(80vw*343/1168)] mx-auto bg-introborrow-chart bg-cover bg-center"></div> */}
          <div className="mt-[40px] md:mt-[60px] pb-[50px] md:pb-0 md:mb-[70px] text-[#707070] text-[5.6px] md:text-[14px] leading-[7px] md:leading-[17px] font-[600] text-center">
            Copyright © 2022 Maui Finance. All rights reserved.Privacy Policy
            Terms and Conditions Legal
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-[#10213f]">
      <div className="absolute w-full h-[100vh] bg-[#10213f] bg-introearn-starsstart bg-cover bg-left">
        {!isMobile && (
          <CSSTransition
            in={earthToCorner}
            timeout={10}
            classNames={{
              enter: "right-[200px] top-[300px] scale-[2]",
              enterActive: "right-[-150px] top-[-350px] scale-[1.5]",
              enterDone: "right-[-150px] top-[-350px] scale-[1.5]"
            }}
          >
            <Earth className="absolute right-[200px] top-[300px] scale-[2] transition-all duration-[2000ms]" />
          </CSSTransition>
        )}
        <TransitionGroup>
          {isMobile && (
            <CSSTransition
              in={enterEarth}
              timeout={1000}
              classNames={{
                enter: 'top-[300px] right-[200px] scale-[2.0]',
                // enterActive: 'top-[-100px] right-[-100px] scale-[1.5]',
                enterDone: 'top-[-100px] right-[-100px] scale-[1.5]',
              }}
            >
              <EarthMobile className="top-[-100px] right-[-100px] absolute scale-[1.3] transition-all duration-[2000ms]"/>
            </CSSTransition>
          )}
        </TransitionGroup>
        {/* <div className="absolute  bg-introearn-earth bg-cover bg-center left-[60vw] md:left-[70vw] bottom-[calc(100vh-60vw)] md:bottom-[60vh] w-[100vw] md:w-[120vh] h-[100vw] md:h-[120vh]"></div> */}
        <div className="absolute left-[-140px] bottom-[-10vh] w-[368.61px] h-[426.14px] bg-introdashboard-shape1 bg-cover bg-center"></div>
        <div className="h-[35vh]"></div>
        <div className="text-[20px] md:text-[48px] leading-[24px] md:leading-[57px] font-[500] md:font-[600] text-[#FFF] text-center">
          EARN
        </div>
        <div className="text-[150px] md:text-[250px] leading-[179px] md:leading-[290px] font-[600] text-[#1199FA] text-center">
          5%
        </div>
        <div className="w-[70%] mx-auto text-[20px] md:text-[32px] leading-[24px] md:leading-[38px] font-[500] md:font-[600] text-[#FFF] text-center">
          Earn on your deposits. Withdraw anytime.
        </div>
      </div>
      <div className="relative w-full md:h-[calc(100vw*963/1512)] flex md:justify-center md:items-center bg-[#10213f] md:bg-introearn-section2 bg-cover bg-left  overflow-hidden">
        <div className="mt-[70px] md:mt-0 w-[90%] mx-auto md:w-[70%] flex flex-col md:items-center">
          <div className="text-[64px] md:text-[74px] leading-[76px] md:leading-[88px] font-[600] text-[#1199FA] text-left md:text-center">
            Earn 5% APY
            {isMobile && <span className="text-[#FFF]">.</span>}
          </div>
          <div className="w-[75%] md:mt-[50px] text-[16px] md:text-[20px] leading-[19px] md:leading-[24px] font-[400] md:font-[500] text-[#FFF] text-left md:text-center">
            No bank will be able to match 5% APY per year on your deposit.
          </div>
          <div className="mt-[50px] md:mt-[80px] md:mx-auto py-[12px] md:py-[15px] md:px-[32px] text-[#FFF] text-center md:text-[32px] md:leading-[38px] md:font-[500] border-[1px] md:border-0 border-[#FFF] rounded-[4px] md:bg-[#1199FA]">
            Calculate Your Yield
          </div>
          {isMobile && (
            <div className="mt-[160px] mx-auto w-[80vw] h-[calc(80vw*675/334)] bg-introdashboard-fullphone bg-cover bg-center"></div>
          )}
        </div>
      </div>
      <div className="md:w-full  md:pb-[150px] md:bg-introearn-star-group2 bg-contain bg-center bg-no-repeat">
        <div className="mt-[160px] md:mt-[70px] w-[96%] mx-auto md:w-[100%] text-[45px] md:text-[74px] leading-[57px] md:leading-[88px] md:font-[600] text-[#FFF] text-center">
          Calculate Your Crypto Yield
          <span className="text-[#18e5a3] md:text-[#FFF]">.</span>
        </div>
        <div className="relative mt-[20px] md:mt-[50px] w-[90%] md:w-[55%] mx-auto text-[14px] md:text-[20px] leading-[17px] md:leading-[24px] font-[500] text-[#ffffffde] text-center">
          <div className="absolute left-[-4px] md:left-[-10vw] top-[calc(0px-20vw*128/441)] md:top-[-70px] w-[20vw] md:w-[28vw] h-[calc(20vw*128/441)] md:h-[calc(28vw*128/441)] bg-introearn-linegroup bg-cover bg-center"></div>
          Make a deposit in any currency, now you are earning 5% APY on your
          deposit. You can access it anytime.
        </div>

        <div className="mt-[60px] md:mt-[150px] mx-auto pt-[30px] md:pt-[5px] w-[88%] md:w-[80%] border-[1px] border-[#ffffff36] px-[10px]">

        {/* Buttons */}
        <div className="flex flex-col flex-wrap md:flex-row justify-center md:justify-between items-center">
        
          <div className="mt-[10px] w-[100%] md:w-[50%] text-[16px] md:text-[24px] leading-[19px] text-[#FFF] px-[5px] flex-grow">
            Choose Your Time Period
         <AnimatedTab tabs={TABS_TIME} onChange={handleTimeChange} selected={timePeriod} className="p-[6px] md:p-[16px] w-[100%] md:w-[50%] margin-[7px] mt-[5px]"/>
       </div>

       <div className="w-[100%] md:w-[calc(50%-20px)] md:mx-[10px] md:my-[10px]">

       <InputAmount
              name="amount"
              className="mt-[40px] w-[100%] md:w-[50%] text-[16px] md:text-[24px] leading-[19px] "
              label={
                <div className="md:w-[50%] w-[50%] text-[16px] md:text-[24px] text-[#FFF]">
                  Enter amount
                </div>
              }
              hookForm={hookForm}
              validate={validateAmount}
              placeholder={1000}
              value={deposit}
            />
        </div>

          <div className="w-[100%] md:w-[calc(50%-20px)] md:mx-[10px] md:my-[10px] text-[16px] md:text-[24px] text-[#FFF] ">
                Expected 10 Year Earnings
        
        <div className="mt-[21px] flex items-center h-[52px] md:h-[64px] bg-[#00308D] border-[#0000002e] border-[0.8px] md:border-[1px] rounded-[13px] px-[22px]">
          <div id='ExpectedEarnings' className="bg-introearn-price-gradient text-[32px] md:text-[40px] leading-[39px] md:leading-[48px] md:font-[600] bg-clip-text text-transparent">
            $14,500 
          </div>
        </div>
        </div>

        <div className="w-[100%] md:w-[calc(50%-20px)] md:mx-[10px] md:my-[10px]">

        <div className= "text-[16px] md:text-[24px] text-[#FFF]">Select your asset</div>
              <SelectAsset isCrypto={true} onChange={setAsset} selectedSymbol={asset} className="md:w-[50%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF]">
                </SelectAsset>
                </div>
                
        
        </div>

        <div className="mt-[21px] bg-introearn-price-gradient  flex items-center justify-center align-items-center h-[52px] md:h-[64px] bg-[#00308D] border-[#0000002e] border-[0.8px] md:border-[1px] rounded-[13px] px-[22px]">
        <div className="items-center text-[#FFF] text-[16px] md:text-[24px] ">
            <Button onClick={calculateEarnings}>Calculate</Button>
        </div>
        </div>

        <EarnChart timeperiod={yearDates} apy={0.05} deposit={deposit}/>

        </div>



        {/* <div className="mt-[60px] md:mt-[150px] mx-auto pt-[30px] md:pt-[70px] w-[88%] md:w-[80%] border-[1px] border-[#ffffff36]">
          
          <div classNames="flex flex-col md:flex-col md:justify-between px-[2%]"> 
          <div classNames="md:w-[50%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF] " >
            <InputAmount
              name="amount"
              className="mt-[40px] w-[100%] md:w-[50%] text-[16px] md:text-[24px] leading-[19px] "
              label={
                <div className="md:w-[50%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF]">
                  Enter amount
                </div>
              }
              hookForm={hookForm}
              validate={validateAmount}
              placeholder={1000}
              value={deposit}
            />
            </div>

            <div className="md:w-[50%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF]">
              <div>Select your asset</div>
              <SelectAsset isCrypto={true} onChange={setAsset} selectedSymbol={asset} className="md:w-[50%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF]">
                </SelectAsset>
              <div className="mt-[25px]  h-[40px] md:h-[56px] rounded-[8.6px] md:rounded-[13px] md:bg-[#0D1E37] shadow-[inset_65px_4px_11px_rgba(111,111,111,0.03),inset_-2px_6px_17px_rgba(112,112,112,0.19)]">

                <div className="h-[40px] md:h-[56px] flex justify-between items-center px-[10px] md:px-[20px]">
                

                  <div className="flex items-center">

                    <div className="w-[30px] h-[30px] bg-introearn-bitcoin bg-cover bg-center"></div>
                    <span className="text-[#767070] mx-[5px]">Bitcoin</span>{" "}
                    <span className="text-[#CCCDCD]">(BTC)</span>
                  </div>
                  <div className="w-[24px] h-[24px] bg-introearn-arrow2 bg-cover bg-center"></div>
                </div>
              </div>
              <div className="mt-[21px] flex items-center h-[52px] md:h-[64px] bg-[#00308D] border-[#0000002e] border-[0.8px] md:border-[1px] rounded-[13px] px-[22px]">
              <div className="bg-introearn-price-gradient text-[32px] md:text-[40px] leading-[39px] md:leading-[48px] md:font-[600] bg-clip-text">
              <Button onClick={calculateEarnings}>Calculate</Button>
              </div>
              </div>
              <div className="mt-[30px]">Amount would you like to deposit</div> 
              <div className="mt-[25px] md:w-[100%] h-[40px] md:h-[56px] rounded-[8.6px] rounded-[13px] md:bg-[#0D1E37] shadow-[inset_65px_4px_11px_rgba(111,111,111,0.03),inset_-2px_6px_17px_rgba(112,112,112,0.19)]">
                <div className="h-[40px] md:h-[56px] flex justify-between items-center px-[10px] md:px-[20px]">
                  <span className="text-[#767070] mx-[5px]">0.00</span>{" "}
                  <div className="bg-introearn-currenty bg-cover bg-center w-[78px] h-[33px]"></div>
                </div>
              </div>
            </div>
            <div className="mt-[25px] md:mt-0 md:w-[40%] text-[16px] md:text-[24px] leading-[19px] md:leadding-[29px] font-[500] text-[#FFF]">
              <div>Choose time period:</div>

              <div className="mt-[25px] p-[7px] flex justify-between items-center w-[80%] md:w-[70%] md:min-w-[300px] h-[40px] md:h-[56px] rounded-[9.25px] rounded-[13px] border-[2px] border-[#000000] md:bg-[#0B1A2F] shadow-[inset_1px_-6px_10px_rgba(112,112,112,0.15),inset_2px_6px_10px_rgba(0,0,0,0.13)]">
              <AnimatedTab tabs={TABS_TIME} onChange={handleTimeChange} selected={timePeriod} className="p-[6px] md:p-[16px]"/>

                <div className="w-[23%] h-[28.5px] md:h-[40px] flex items-center justify-center text-[10px] leading-[15px] md:text-[14px] md:leading-[21px] md:font-[400] text-[#1199FA] rounded-[7.8px] md:rounded-[11px] bg-[#00000036] shadow-[-2px_-2px_4px_rgba(12,62,159,0.17),2px_4px_5px_rgba(12,62,159,0.21)] backdrop-blur-[4px]">
                  Year
                </div>
                <div className="w-[23%] h-[28.5px] md:h-[40px] flex items-center justify-center text-[10px] leading-[15px] md:text-[14px] md:leading-[21px] md:font-[400] text-[#ffffffd1]">
                  Month
                </div>
                <div className="w-[23%] h-[28.5px] md:h-[40px] flex items-center justify-center text-[10px] leading-[15px] md:text-[14px] md:leading-[21px] md:font-[400] text-[#ffffffd1]">
                  Week
                </div>
                <div className="w-[23%] h-[28.5px] md:h-[40px] flex items-center justify-center text-[10px] leading-[15px] md:text-[14px] md:leading-[21px] md:font-[400] text-[#ffffffd1]">
                  Day
                </div>
              </div>
              <div className="mt-[30px] text-[20px] md:text-[24px]">
                Expected 10 Year Earnings
              </div>
              <div className="mt-[21px] flex items-center h-[52px] md:h-[64px] bg-[#00308D] border-[#0000002e] border-[0.8px] md:border-[1px] rounded-[13px] px-[22px]">
                <div id='ExpectedEarnings' className="bg-introearn-price-gradient text-[32px] md:text-[40px] leading-[39px] md:leading-[48px] md:font-[600] bg-clip-text text-transparent">
                  $14,500
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[30px] px-[5%]">
            <div className="text-[#ffffffe3] text-[11px] md:text-[24px] leading-[13px] md:leading-[29px] md:font-[400]">
              Expected Earnings based on your deposit
            </div>
            Graph goes here 
              <div id="Chart" classnames="mt -30px w-[80vw] md:w-[70vw] h-[calc(80vw*334/911)] md:h-[calc(70vw*334/911)]"> 
              <EarnChart timeperiod={yearDates} apy={0.05} deposit={deposit}/>
              </div>
            <div className="mt-[20px] bg-introearn-chart bg-cover bg-center w-[80vw] md:w-[70vw] h-[calc(80vw*334/911)] md:h-[calc(70vw*334/911)]"></div>
          </div>
          {isMobile && (
            <div className="mt-[6px] px-[5%] pb-[10px] flex justify-end">
              <div className="w-[31.5px] h-[31.5px] bg-introdashboard-fullscreenimage bg-cover bg-center"></div>
            </div>
          )}
          {!isMobile && (
            <div className="md:mt-[38px] md:mb-[70px] text-[#707070] text-[14px] leading-[17px] font-[600] text-center">
              Copyright © 2022 Maui Finance. All rights reserved.Privacy Policy
              Terms and Conditions Legal
            </div>
          )}
          </div>*/} 
        {isMobile && (
          <div className="mt-[38px] mx-auto w-[70%] pb-[50px] text-[#707070] text-[8px] leading-[10px] font-[600] text-center">
            Copyright © 2022 Maui Finance. All rights reserved.Privacy Policy
            Terms and Conditions Legal
          </div>
        )}
        {!isMobile && (
          <div className="md:w-[80%] md:mt-[20px] flex flex-row-reverse md:text-[16px] md:leading-[19px] md:font-[500] text-[#6F6F6F] tracking-[0.195em] mx-auto">
            USD, EUR, USDC, DAI*
          </div>
        )}
      </div>
    </div>
  );
}

export default IntroEarn;
