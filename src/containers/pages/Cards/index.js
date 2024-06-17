import React from 'react';

function Cards() {
  return (
    <div className='relative w-full min-h-[970px] md:min-h-[1700px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000'>
      {/* bg images */}
      <div className='bg-cards-leftbottom bg-center bg-cover absolute left-0 bottom-0 w-[318px] h-[270px] md:w-[636px] md:h-[541px]'></div>
      <div className='bg-cards-leftmiddle bg-center bg-cover absolute left-0 top-[250px] md:top-[500px] w-[178px] h-[298px] md:w-[357px] md:h-[596px]'></div>
      <div className='bg-cards-rightbottom bg-center bg-cover absolute right-0 bottom-0 w-[214px] h-[291px] md:w-[427px] md:h-[582px]'></div>
      <div className='bg-cards-rightmiddle bg-center bg-cover absolute right-0 top-[155px] md:top-[310px] w-[230px] h-[298px] md:w-[459px] md:h-[597px]'></div>
      <span className='absolute top-[100px] w-full text-center block md:hidden font-semibold text-[40px] leading-[48px] tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>CARDS</span>
      {/* card */}
      <div className='absolute w-[320px] top-[160px] left-[calc(50%-160px)] md:w-[1020px] md:top-[230px] md:left-[calc(50%-510px)] bg-borrow-card dark:bg-borrow-card-dark shadow-borrow-card dark:shadow-borrow-card-dark border border-[#FFFFFF] rounded-[33px] p-[20px] md:p-[40px]'>
        <div className='text-[#000000] dark:text-[#FFFFFF] text-[14px] md:text-[18px] leading-[2px] transition-all duration-1000'>Introducing</div>
        <div className='pl-5'>
          <span className='font-semibold text-[32px] md:text-[64px] leading-[48px] md:leading-[96px] tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Cards</span>
        </div>
        <div className='mt-[20px]'>
          <div className='bg-cards-cardtop bg-center bg-cover w-[234px] h-[244px] md:w-[467px] md:h-[488px] m-auto'></div>
        </div>
        <div className='mt-[50px] mb-[50px] md:mb-[250px] w-full'>
          <div className='bg-center bg-cover bg-cards-arrowhead-down w-[73px] h-[58px] md:w-[146px] md:h-[117px] m-auto' />
          <div className='bg-center bg-cover bg-cards-arrowhead-down w-[60px] h-[50px] md:w-[120px] md:h-[100px] m-auto' />
          <div className='mt-[100px] bg-center bg-cover bg-cards-availablesoon w-[280px] h-[24px] md:w-[917px] md:h-[83px] m-auto' />
        </div>
      </div>
    </div>
  )
}

export default Cards;