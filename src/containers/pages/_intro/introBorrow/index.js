import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Earth from "../../../../components/Earth";
import EarthMobile from "../../../../components/EarthMobile";
import useWindowSize from "../../../../utils/useWindowSize";
import functionPlot from 'function-plot';
import CustomSlider from './slider';
import BorrowChart from './BorrowChart';

function IntroBorrow() {
  const size = useWindowSize();

  const [isMobile, setIsMobile] = useState(false);
  const [enterEarth, setEnterEarth] = useState(false);
  const [enterBorrowUp, setEnterBorrowUp] = useState(false);
  
  const handleEnterBorrowUp = () => {    
    setEnterBorrowUp(true);
  };

  useEffect(() => {
    setEnterEarth(true)
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (size.width <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [size]);

  const handleChanged = (collateral, borrowed, apy) => {
    const width = isMobile ? 175 : 370;
    const height = isMobile ? 135 : 270;
    // console.log('val', collateral, borrowed, apy);
    functionPlot({
      target: "#plot",
      width: width,
      height: height,
      yAxis: {
        label: "Remaining Debt",
        domain: [0, 50],
        color: '#FFFFFF',
      },
      xAxis: {
        label: "X axis",
        domain: [0, 30],
      },
      data: [
        {
          fn: `(${(-collateral / 1200) * apy}x + ${borrowed}) / 1000`,
        },
      ],
      disableZoom: true,
    });
  };

  return (
    <div className="relative bg-[#10213f] md:pb-[70px]">
      <div className="absolute left-[-200px] top-[20vh] w-[100%] h-[977px] bg-introborrow-shape2 bg-cover bg-center z-10 animate-display1"></div>
      <div className="absolute left-[-50px] top-[20vh] w-[158px] h-[151px] bg-introborrow-shape2 bg-cover bg-center z-10 rotate-[60deg] animate-display1"></div>
      <div className="relative w-full h-[100vh] bg-[#10213f] bg-introearn-starsstart bg-cover bg-left  overflow-hidden">
        {!isMobile && (
          <CSSTransition
            in={enterEarth}
            timeout={1000}
            classNames={{
              enter: 'top-[300px] right-[200px] scale-[2.0]',
              enterActive: 'top-[-350px] right-[-250px] scale-[1.5]',
              enterDone: 'top-[-350px] right-[-250px] scale-[1.5]',
              exit: 'top-[-350px] right-[-250px] scale-[1.5]',
              exitActive: 'top-[300px] right-[200px] scale-[0.5]',
              exitDone: 'top-[300px] right-[200px] scale-[0.5]',
            }}
          >
            <Earth className="absolute scale-[2.0] transition-all duration-[2000ms]"/>
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
              <EarthMobile className="absolute scale-[1.3] transition-all duration-[2000ms]"/>
            </CSSTransition>
          )}
        </TransitionGroup>
        <div className="absolute left-[-100px] top-0 w-[232px] h-[250px] bg-introborrow-shape1 bg-cover bg-center md:animate-move3"></div>
        <div className="w-full mt-[26vh]"></div>
        {!isMobile && (
          <CSSTransition
            in={enterEarth}
            // appear={enterEarth}
            timeout={1000}
            classNames={{
              enter: 'scale-[0.3] bottom-[-9rem]',
              // enterActive: 'scale-[0.6] bottom-[-3rem]',
              enterDone: 'scale-[0.9] bottom-1',
              // enterActive: 'scale-[0.3] bottom-0 duration-[1000ms]',
              // enterDone: 'scale-[0.9] bottom-0 duration-[2000ms]',
              // appear: 'opacity-0 bottom-0',
              // appearActive: 'opaicty-100 bottom-0',
              // appearDone: 'opaicty-100 bottom-0',
            }}
          >
            <div className="absolute transition-all duration-[2000ms] scale-[0.3]" onClick={handleEnterBorrowUp}>
              <div className="text-[20px] md:text-[40px] leading-[24px] md:leading-[48px] font-[500] md:font-[600] text-[#FFF] text-center">
                BORROW UP TO
              </div>
              <div className="text-[50px] md:text-[250px] leading-[79px] md:leading-[300px] font-[600] text-[#1199FA] text-center">
                50%
              </div>
              <div className="w-[70%] mx-auto md:text-[18px] md:leading-[21px] md:font-[500] text-[#FFF] text-center">
                Welcome to the future of banking, where you are the bank. A system designed to serve you, and not the other way around. Let's say you deposit $10,000, you then can borrow $5,000 on your deposit instantly and not only you don't have to pay interest, but you get pay zero money per month. Your collateral gets locked, and the yield generated pays off your loan. You have to re imagine the way you see finance. Maui brings you the future of people's new way of banking where everyone os their own bank and profit from themselves.
              </div>
            </div>
          </CSSTransition>
        )}
        <TransitionGroup>
          {isMobile && (
            <CSSTransition
              in={enterEarth}
              // appear={enterEarth}
              timeout={1000}
              classNames={{
                enter: 'scale-[1] top-[35vh]',
                // enterActive: 'scale-[0.6] bottom-[-3rem]',
                enterDone: 'scale-[1] top-[37vh]',
                // enterActive: 'scale-[0.3] bottom-0 duration-[1000ms]',
                // enterDone: 'scale-[0.9] bottom-0 duration-[2000ms]',
                // appear: 'opacity-0 bottom-0',
                // appearActive: 'opaicty-100 bottom-0',
                // appearDone: 'opaicty-100 bottom-0',
              }}
            >
              <div className="absolute transition-all duration-[2000ms] scale-[1]" onClick={handleEnterBorrowUp}>
                <div className="text-[20px] md:text-[40px] leading-[24px] md:leading-[48px] font-[500] md:font-[600] text-[#FFF] text-center">
                  Borrow Upto
                </div>
                <div className="text-[160px] md:text-[250px] leading-[200px] md:leading-[300px] font-[600] text-[#1199FA] text-center">
                  50%
                </div>
                <div className="w-[70%] mx-auto md:text-[18px] md:leading-[21px] md:font-[500] text-[#FFF] text-center">
                  Welcome to the future of banking, where you are the bank. A system designed to serve you, and not the other way around.
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
      <div className="relative w-full h-[100vh] md:h-[calc(100vw*963/1512)] flex justify-center items-center bg-[#10213f] bg-introborrow-section2mobile md:bg-introborrow-section2 bg-cover bg-center  overflow-hidden">
        <div className="mt-[70px] md:mt-0 w-[85%] mx-auto md:w-[70%] flex flex-col items-center">
          <div className="text-[32px] md:text-[64px] leading-[109%]  md:leading-[57px] font-[600] text-[#043189] text-center">
            BORROW up to 50% on your deposit instantly and permissionless. No
            repayments, no liquidations
          </div>
          {!isMobile && (
            <div className="w-[75%] md:mt-[50px] text-[16px] md:text-[20px] leading-[19px] md:leading-[24px] font-[400] md:font-[500] text-[#FFF] text-left md:text-center">
              <div>
                Maui Banking evolutionary services come when you borrow.
              </div>
              <br />{" "}
              <div>
                No applications, no forms, no risk management, no repayments.
                The loan repays itself with the yields generated by your
                collateral.
              </div>
            </div>
          )}
          <div className="mt-[50px] md:mt-[80px] md:mx-auto py-[12px] md:py-[15px] px-[28px] md:px-[32px] text-[#FFF] text-center text-[16px] md:text-[32px] leading-[19px] md:leading-[38px] font-[500] border-[1px] md:border-0 border-[#FFF] rounded-[4px] bg-[#0C3E9F] md:bg-[#10213f] cursor-pointer">
            Calculate Your Loan
          </div>
        </div>
      </div>
      <div className="md:w-full  md:pb-[150px] md:bg-introearn-star-group2 bg-contain bg-center bg-no-repeat">
        {/* <div className="mt-[100px] md:mt-[160px] w-[96%] mx-auto md:w-[100%] text-[45px] md:text-[74px] leading-[57px] md:leading-[88px] md:font-[600] text-[#FFF] text-center">
          Calculate Your Loan
          <span className="text-[#18e5a3] md:text-[#FFF]">.</span>
        </div>
        <div className="relative mt-[20px] md:mt-[80px] w-[90%] md:w-[55%] mx-auto text-[20px] md:text-[32px] leading-[24px] md:leading-[38px] font-[500] text-[#ffffffde] text-center">
          <div className="absolute left-[-4px] md:left-0 top-[calc(0px-20vw*128/441)] md:top-[-100px] w-[20vw] md:w-[28vw] h-[calc(20vw*128/441)] md:h-[calc(28vw*128/441)] bg-introearn-linegroup bg-cover bg-center"></div>
          {isMobile && (
            <div className="mb-[100px] text-[14px] leading-[17px] text-[rgba(255,255,255,0.87)]">
              Make a deposit in any currency from anywhere in the world, now you
              are earning 8% fixed rate p.a. on your deposit. You can access it
              anytime.
            </div>
          )}
          <div>How much would you like to Deposit?</div>
        </div>
        <div className="w-[310px] md:w-[60%] mx-auto mt-[30px] md:mt-[40px] px-[5px] md:px-[18px] h-[44px] md:h-[138px] bg-[#0B1B32] rounded-[1000px] flex items-center justify-between text-[#6F6F6F] text-[20px] md:text-[48px] leading-[24px] md:leading-[57px] font-[600] shadow-[-9px_-1px_28px_#000000,inset_-4px_2px_6px_rgba(0,0,0,0.25),inset_5px_2px_6px_rgba(0,0,0,0.25)]">
          <div className="w-[33.33px] md:w-[100px] h-[33.33px] text-[#FFF] md:h-[100px] flex items-center justify-center bg-[#102544] shadow-[1px_1px_6px_rgba(0,0,0,0.25)] rounded-[100px]">
            +
          </div>
          <div>$14,420</div>
          <div className="w-[33.33px] md:w-[100px] h-[33.33px] text-[#FFF] md:h-[100px] flex items-center justify-center bg-[#102544] shadow-[1px_1px_6px_rgba(0,0,0,0.25)] rounded-[100px]">
            -
          </div>
        </div>
        <div className="relative mt-[20px] mt-[60px] w-[90%] md:w-[55%] mx-auto text-[32px] md:text-[32px] leading-[17px] md:leading-[38px] font-[500] text-[#ffffffde] text-center">
          You would get
        </div>
        <div className="w-[310px] md:w-[60%] mx-auto mt-[30px] md:mt-[20px] md:mt-[40px] px-[5px] md:px-[18px] h-[44px] md:h-[138px] bg-[#0B1B32] rounded-[1000px] flex items-center justify-center text-[#6F6F6F] md:text-[48px] md:leading-[57px] md:font-[600] shadow-[-9px_-1px_28px_#000000,inset_-4px_2px_6px_rgba(0,0,0,0.25),inset_5px_2px_6px_rgba(0,0,0,0.25)]">
          <div className="text-[24px] md:text-[64px] leading-[29px] md:leading-[76px] md:font-[600] text-transparent bg-introborrow-calculate-gradient bg-clip-text">
            $20,500
          </div>
        </div>
        <div className="mt-[60px] mx-auto w-[94%] md:w-[500px] flex items-center justify-between">
          <div className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] bg-introborrow-switchcolor bg-cover bg-center"></div>
          <div className="md:h-[70px] flex flex-col justify-between">
            <div className="text-[14.5px] md:text-[21px] leading-[17px] md:leading-[26px] font-[400] text-[#6f6f6f]">
              With $40,000 or more of staked CRO
            </div>
            <div className="bg-introearn-currenty bg-cover bg-center w-[78px] h-[33px]"></div>
          </div>
        </div> */}
        {/* <div className="mt-[200px] md:mt-[300px] md:w-[55%] mx-auto md:min-w-[750px] flex flex-col md:flex-row justify-between">
          <div>
            <div className="text-[16px] md:text-[20.5px] leading-[19px] md:leading-[24px] font-[500] text-[#FFF] text-center">
              UPTO
            </div>
            <div className="text-[91px] md:text-[96px] leading-[118px] md:leading-[125px] font-[700] text-[#1199FA] text-center">
              5%
            </div>
            <div className="text-[19px] md:text-[20px] leading-[23px] md:leading-[24px] font-[500] text-[#FFF] text-center">
              p.a.
            </div>
          </div>
          <div className="mt-[150px] md:mt-0">
            <div className="text-[16px] md:text-[20.5px] leading-[19px] md:leading-[24px] font-[500] text-[#FFF] text-center">
              UPTO
            </div>
            <div className="text-[91px] md:text-[96px] leading-[118px] md:leading-[125px] font-[700] text-[#1199FA] text-center">
              $50.00 USD
            </div>
            <div className="text-[19px] md:text-[20px] leading-[23px] md:leading-[24px] font-[500] text-[#FFF] text-center">
              Interest per month
            </div>
          </div>
        </div> */}
      </div>
      <div id="borrowCalc" className="mt-[60px] md:mt-[50px] mx-auto pt-[30px] md:pt-[70px] w-[96%] md:w-[80%] md:border-[1px] md:border-[rgba(0,0,0,0.21)]">
        <div className="flex flex-row justify-around px-[2%]">
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
              
            </div>
          )}
          {isMobile && (
            <div className="w-[31.5px] h-[31.5px] bg-introdashboard-fullscreenimage bg-cover bg-center"></div>
          )}
        </div>
        <div className='relative w-full flex flex-col md:flex-row justify-center p-[20px]'>

          <div className='text-center w-full p-[20px] flex flex-col justify-center items-center'>

            <div className='p-[20px] md:p-[40px] mt-[20px] rounded-[14px] border-[4px] border-[#797476] bg-[#2c2930] text-[rgba(255,255,255,0.94)]'>
            <BorrowChart apy={0.03} ></BorrowChart>

              <div className='text-left pl-[10px] text-[14px] md:text-[24px] text-[#000] text-[rgba(255,255,255,0.94)]'><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Zero</span> Repayments</div>
              {/* <div className='mt-[20px] w-[200px] h-[150px] md:w-[400px] md:h-[300px] rounded-[14px] border-[4px] border-[#797476] bg-[#2c2930]'> */}
                {/* <div className='rounded-[18px] w-[200px] h-[150px] md:w-[400px] md:h-[300px]' id="plot"></div> */}

              {/* </div> */}
            </div>
          </div>
          <div className='text-center w-full p-[20px] md:p-[40px] flex flex-col justify-center items-center'>
          <div className="md:mt-[20px] mx-auto flex flex-col justify-between md:w-[228px] md:h-[140px] md:rounded-[6px] border-[1px] border-[rgba(255,255,255,0.62)] md:px-[16px] md:py-[24px]">
                <div className="flex justify-between">
                  <div className="md:text-[16px] md:leading-[24px] md:max-w-[48%] md:font-[400] text-[#fff] flex items-end">
                    Duration:{" "}
                  </div>
                  <div className="md:text-[16px] md:leading-[24px] md:font-[400] text-[#1BA9EA] flex items-end">
                    <a id="loanDuration"> 365 Days{" "}</a>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="md:text-[16px] md:leading-[24px] md:max-w-[48%] md:font-[400] text-[#fff] flex items-end">
                    Maturity Date:
                  </div>
                  <div className="md:text-[16px] md:leading-[24px] md:font-[400] text-[#1BA9EA] flex items-end">
                    <a id="maturationDate">03.12.2023 </a>
                  </div>
                </div>
              </div>
            <div>
              <div className='text-[14px] md:text-[16px] text-[#000] text-[rgba(255,255,255,0.94)]'>Borrow <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9] md:text-[16px] text-[24px]'>Permissionless</span> and <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#39C6D9] to-[#00DDA2] text-[16px] md:text-[24px]'>Instantly</span></div>
            </div>
            {/* <div className='mt-[20px] w-[250px] md:w-[350px] h-[300px] rounded-[14px] border-[4px] border-[#797476] bg-[#2c2930]'>
              <CustomSlider
                onChange={handleChanged}
              />
            </div> */}
          </div>
        </div>
        {/* <div className="mt-[50px] w-[96vw] md:w-[80vw] h-[calc(96vw*343/1168)] md:h-[calc(80vw*343/1168)] mx-auto bg-introborrow-chart bg-cover bg-center"></div> */}
        <div className="mt-[40px] md:mt-[60px] pb-[50px] md:pb-0 md:mb-[70px] text-[#707070] text-[5.6px] md:text-[14px] leading-[7px] md:leading-[17px] font-[600] text-center">
          Copyright © 2022 Maui Finance. All rights reserved.Privacy Policy
          Terms and Conditions Legal
        </div>
      </div>
    </div>
  );
}

export default IntroBorrow;
