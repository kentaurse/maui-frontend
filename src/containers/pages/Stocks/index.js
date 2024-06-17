import React from 'react';

function TooltipRow({className, icon, terraPrice}) {
  return (
    <div className={`absolute w-full md:w-[calc(100%-70px)] left-[5px] p-0 md:left-[20px] md:p-[20px] pt-[0px] md:pb-[30px] flex items-center dark:text-[#F9D3B4] text-[#273855] text-[12px] transition-all duration-1000 ${className}`}>
      <div className='w-[60px] md:w-[200px] flex'>
        <div className={`bg-cover bg-center w-[23px] h-[23px] md:w-[45px] md:h-[45px] ${icon}`}/>
        <div className='ml-[2px] md:ml-[10px] flex flex-col justify-center'>
          <div className='text-[9px] md:text-[16px] text-[#273855] dark:text-[#FFF] font-normal md:font-semibold'>mAAPL</div>
          <div className='text-[7px] md:text-[12px] text-[#273855] dark:text-[#F9D3B4]'>Apple Inc.</div>
        </div>
      </div>
      <div className='w-[60px] md:w-[130px] flex text-[#273855] dark:text-[#FFF] items-center'>
        <span className='font-normal md:font-semibold text-[8px] md:text-[14px]'>{terraPrice}</span>
        <span className='ml-[5px] text-[8px] md:text-[12px]'>UST</span>
      </div>
      <div className='w-[60px] md:w-[130px] flex text-[#273855] dark:text-[#FFF] items-center'>
        <span className='font-normal md:font-semibold text-[8px] md:text-[14px]'>162.72</span>
        <span className='ml-[5px] text-[8px] md:text-[12px]'>UST</span>
      </div>
      <div className='w-[50px] md:w-[130px] flex text-[#273855] dark:text-[#FFF] items-center'>
        <span className='font-normal md:font-semibold text-[8px] md:text-[14px]'>8.32%</span>
      </div>
      <div className='w-[40px] md:w-[130px] flex text-[#273855] dark:text-[#FFF] items-center'>
        <span className='font-normal md:font-semibold text-[8px] md:text-[14px]'>150%</span>
      </div>
      <div className='w-[80px] md:w-[280px] flex justify-between'>
        <div className='bg-center bg-cover bg-stocks-btn-buy w-[24px] h-[15px] md:w-[83px] md:h-[42px]'></div>
        <div className='bg-center bg-cover bg-stocks-btn-sell w-[24px] h-[15px] md:w-[83px] md:h-[42px]'></div>
        <div className='bg-center bg-cover bg-stocks-btn-neutral dark:bg-stocks-btn-neutral-dark w-[24px] h-[15px] md:w-[83px] md:h-[42px]'></div>
      </div>
    </div>
  )
}
function Stocks() {
  return (
    <div className='relative w-full min-h-[860px] md:min-h-[1530px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000'>
      {/* bg images */}
      <div className='bg-stocks-left bg-center bg-cover absolute left-0 bottom-[10%] md:bottom-[30%] w-[300px] md:w-[600px] h-[175px] md:h-[350px]'></div>
      <div className='bg-stocks-right bg-center bg-cover absolute right-0 top-[100px] md:top-[200px] w-[250px] md:w-[500px] h-[175px] md:h-[350px]'></div>
      <span className='absolute top-[100px] w-full text-center block md:hidden font-semibold text-[40px] leading-[48px] tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>STOCKS</span>
      {/* card */}
      <div className='absolute w-[350px] top-[160px] left-[calc(50%-175px)] md:w-[1020px] md:top-[230px] md:left-[calc(50%-510px)] bg-stocks-card dark:bg-stocks-card-dark shadow-stocks-card dark:shadow-stocks-card-dark border border-[#FFFFFF] rounded-[33px]'>
        <div className='mt-[20px] md:mt-[50px] text-center'>
          <span className='text-[18px] tracking-[5px] md:text-[35px] md:tracking-[10px] drop-shadow-[0_0px_4px_rgba(162,89,255,0.67)] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Synthetic Stocks</span>
        </div>
        <div className='mt-[30px] md:mt-[70px]'>
          <div className='ml-[-10px] md:ml-[-100px] relative'>
            <div className='bg-stocks-tooltip dark:bg-stocks-tooltip-dark bg-center bg-cover w-[360px] h-[112px] md:w-[1100px] md:h-[350px]'></div>
            <div className='absolute top-[10px] md:top-[30px] w-full left-[10px] md:left-[40px] flex items-center dark:text-[#F9D3B4] text-[#273855] text-[8px] md:text-[12px] transition-all duration-1000'>
              <div className='w-[40px] md:w-[200px]'>Ticker</div>
              <div className='w-[70px] md:w-[130px]'>Terraswap Price</div>
              <div className='w-[60px] md:w-[130px]'>Oracle Price</div>
              <div className='w-[50px] md:w-[130px]'>Premium</div>
              <div className='w-[60px] md:w-[130px]'>Min Col. Ratio</div>
              <div className='w-[60px] md:w-[280px] text-center'>Action</div>
            </div>
            <TooltipRow
              className="top-[30px] md:top-[100px] md:border-b-[1px] md:dark:border-b-[#F9D3B4] md:border-b-[#D2D2D2]"
              icon="bg-stocks-icon-aapl"
              terraPrice="164.92"
            />
            <TooltipRow
              className="top-[60px] md:top-[200px]"
              icon="bg-stocks-icon-abnb"
              terraPrice="$13.13"
            />
          </div>
          <div className='w-full'>
            <div className='m-auto bg-center bg-cover bg-stocks-oneclick w-[240px] h-[109px] md:w-[477px] md:h-[217px]' />
          </div>
          <div className='w-full relative h-[120px] md:h-[250px] mt-[60px] md:mt-[100px]'>
            <div className='m-auto bg-center bg-cover bg-stocks-stocks dark:bg-stocks-stocks-dark dark:w-[100px] dark:h-[25px] dark:md:w-[201px] dark:md:h-[49px] w-[137px] h-[37px] md:w-[275px] md:h-[74px]' />
            <div className='m-auto mt-[-20px] bg-center bg-cover bg-stocks-availablesoon dark:bg-stocks-availablesoon-dark w-[280px] h-[40px] md:w-[806px] md:h-[117px]' />
          </div>
        </div>
        <div className='mt-[20px] mb-[30px] text-[14px] md:text-[24px] font-semibold text-center tracking-[2px]'>
          <span className='text-[#39C6D9]'>Buy</span>
          <span className='text-[#000000] dark:text-[#FFFFFF] pl-2 pr-2 transition-all duration-1000'>-</span>
          <span className='text-[#EB5757]'>sell</span>
          <br />
          <span className='text-[14px] md:text-[18px] tracking-[5px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#39C6D9]'>Delta neutral</span>
        </div>
      </div>
    </div>
  )
}

export default Stocks;