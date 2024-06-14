import React from 'react';
import { useHistory } from "react-router-dom";

function Splash() {
  let history = useHistory();
  function handleClick(){
    history.push('/introdashboard');
  }
  return (
    <div className='fixed w-full h-screen cursor-pointer' onClick={handleClick}>
      <div className='fixed w-full h-full flex flex-col justify-center items-center '>
        <div className='bg-splash-logo dark:bg-splash-logo-dark bg-center bg-cover w-[193px] h-[76px] md:w-[405px] md:h-[141px] transition-all duration-1000'></div>
        <div className='mt-[10px] md:mt-0 mb-20 font-semibold text-[18px] leading-[20px] tracking-[5px] md:text-[36px] md:leading-[54px] md:tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Be Unreasonable</div>
      </div>
      <div className='fixed left-[10%] bottom-[5%] md:left-[20%] md:bottom-[10%] text-center'>
        <div className='font-bold text-[#00DDA2] tracking-[5px] text-[18px] md:text-[24px]'>"One click"</div>
        <div className='font-bold text-[#728AB7] dark:text-[#ffffff] tracking-[5px] text-[12px] md:text-sm transition-all duration-1000'>Strategies</div>
      </div>
      <div className='hidden md:block bg-splash-lefttop1 bg-center bg-cover fixed top-0 left-[123px] w-[213px] h-[193px] transition-all duration-1000'></div>
      <div className='hidden md:block bg-splash-lefttop1 bg-center bg-cover fixed top-0 left-[290px] w-[134px] h-[113px] transition-all duration-1000'></div>
      <div className='hidden md:block bg-splash-leftmiddle dark:bg-splash-leftmiddle-dark bg-center bg-cover fixed top-[20px] left-0 w-[426px] h-[557px] transition-all duration-1000'></div>
      <div className='hidden md:block bg-splash-leftbottom dark:bg-splash-leftbottom-dark bg-center bg-cover fixed left-[100px] bottom-0 w-[284px] h-[425px] transition-all duration-1000'></div>
      <div className='hidden md:block bg-splash-righttop dark:bg-splash-righttop-dark bg-center bg-cover fixed right-[50px] top-0 w-[532px] h-[489px] transition-all duration-1000'></div>
      <div className='bg-splash-rightbottom bg-center bg-cover fixed right-0 bottom-0 w-[617px] h-[470px] transition-all duration-1000'></div>
    </div>
  );
}

export default Splash;
