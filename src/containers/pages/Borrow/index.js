import React from 'react';
import functionPlot from 'function-plot';
import {isMobile} from 'react-device-detect';
import CustomSlider from './slider';

function Borrow() {
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
    <div className='relative w-full min-h-[1610px] md:min-h-[1760px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000'>
      {/* bg images */}
      <div className='bg-borrow-left bg-center bg-cover absolute left-0 md:left-[-143px] top-[200px] w-[300px] h-[280px] md:w-[1024px] md:h-[768px]'></div>
      <div className='bg-borrow-leftbottom bg-center bg-cover absolute left-0 bottom-0 w-[336px] h-[383px] md:w-[677px] md:h-[766px]'></div>
      <div className='bg-borrow-righttop bg-center bg-cover absolute right-0 top-[100px] w-[162px] h-[156px] md:w-[325px] md:h-[313px]'></div>
      <div className='bg-borrow-rightbottom bg-center bg-cover absolute right-0 top-[300px] w-[274px] h-[290px] md:w-[549px] md:h-[581px]'></div>
      <div className='bg-borrow-rightbottom2 bg-center bg-cover absolute right-0 bottom-0 w-[280px] h-[454px] md:w-[559px] md:h-[909px]'></div>
      <span className='absolute top-[100px] w-full text-center block md:hidden font-semibold text-[40px] leading-[48px] tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>BORROW</span>
      {/* card */}
      <div className='absolute w-[350px] top-[160px] left-[calc(50%-175px)] md:w-[1020px] md:top-[230px] md:left-[calc(50%-510px)] bg-borrow-card dark:bg-borrow-card-dark shadow-borrow-card dark:shadow-borrow-card-dark border border-[#FFFFFF] rounded-[33px]'>
          <div className='mt-[30px] text-[14px] md:text-[30px] text-[#273855] dark:text-[#728AB7] text-center transition-all duration-1000'>Get access up to <span className='text-[#273855] dark:text-[#FFFFFF] font-bold transition-all duration-1000'>50%</span> of your collateral with</div>
          <div className='text-[14px] md:text-[30px] text-center'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>no repayments</span>
            <span className='pl-3 pr-3 dark:text-[#728AB7]'>&</span>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#39C6D9] to-[#00DDA2]'>no liquidation risk!</span>
          </div>
          <div className='relative mt-[20px] md:mt-[100px] w-full flex flex-col md:flex-row justify-center p-[20px]'>
            <div className='text-center w-full p-[40px]'>
              <div>
                <div className='text-left pl-[10px] text-[14px] md:text-[24px] text-[#000] dark:text-[#EFEFFA]'><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Zero</span> Repayments</div>
                <div className='mt-[20px] w-[200px] h-[150px] md:w-[400px] md:h-[300px] rounded-[14px] border-[1px] border-[#FFFFFF00] dark:border-[#F9D3B4] bg-[#EBEBF8] dark:bg-borrow-card-small-dark shadow-borrow-card-small dark:shadow-borrow-card-small-dark'>
                  <div className='rounded-[18px] w-[200px] h-[150px] md:w-[400px] md:h-[300px]' id="plot"></div>
                </div>
              </div>
              <div className='mt-[50px] md:mt-[100px]'>
                <div className='text-[16px] text-[#000] dark:text-[#EFEFFA] mb-[20px]'>Your yield <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9] text-[24px]'>Self Repays</span> your loan</div>
                <div className='m-auto bg-[#EBEBF8] dark:bg-borrow-card-small-dark rounded-[14px] border-[#FFFFFF00] border-[3px] dark:border-[#FFFFFF40] p-[10px] pt-[20px] pb-[20px] shadow-borrow-card-small dark:shadow-borrow-card-small-dark w-[250px]'>
                  <div className='flex justify-between'>
                    <div className='w-[80px] text-[#273855] dark:text-[#F9D3B4]'>Duration:</div>
                    <div className='text-[#7879F1]'>365 Days</div>
                  </div>
                  <div className='flex justify-between items-center mt-[10px]'>
                    <div className='w-[80px] text-[#273855] dark:text-[#F9D3B4]'>Maturity Date:</div>
                    <div className='text-[#7879F1]'>03.12.2023</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center w-full p-[20px] md:p-[40px] flex flex-col justify-center items-center'>
              <div>
                <div className='text-[14px] md:text-[16px] text-[#000] dark:text-[#EFEFFA]'>Borrow <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9] md:text-[16px] text-[24px]'>Permissionless</span> and <span className='text-transparent tracking-tight bg-clip-text bg-gradient-to-r from-[#39C6D9] to-[#00DDA2] text-[16px] md:text-[24px]'>Instantly</span></div>
              </div>
              <div className='mt-[20px] w-[250px] h-[300px] rounded-[14px] border-[2px] border-[#FFFFFF00] dark:border-[#F9D3B4] bg-[#EBEBF8] dark:bg-borrow-card-small-dark shadow-borrow-card-small dark:shadow-borrow-card-small-dark'>
                <CustomSlider
                  onChange={handleChanged}
                />
              </div>
            </div>
          </div>
          <div className='w-full text-center relative'>
            <span className='block dark:hidden font-medium leading-[125px] text-[75px] md:leading-[250px] md:text-[250px] borrow-span-borrow'>Borrow</span>
            <span className='hidden dark:block font-medium leading-[75px] text-[75px] md:leading-[250px] md:text-[250px] borrow-span-borrow-dark'>Borrow</span>
            <div className='absolute w-full top-[50px] md:top-[100px] text-center'>
              <span className='block dark:hidden font-medium text-[72px] md:text-[144px] text-[#728AB7] dark:text-[#FFFFFF] borrow-span-soon'>SOON</span>
              <span className='hidden dark:block font-medium text-[72px] md:text-[144px] text-[#728AB7] dark:text-[#FFFFFF] borrow-span-soon-dark'>SOON</span>
            </div>
          </div>
          <div className='mt-[60px] mb-[35px] md:mt-[120px] md:mb-[70px] text-center tracking-[4px]'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Deposit - Borrow -Zero Repayments</span>
          </div>
      </div>
    </div>
  )
}

export default Borrow;