import React, { useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import Card from './card';

function Main(props) {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
  
  useEffect(() => {
    if (props.state === 'entering') {
      // gsap.timeline().fromTo("#main-righttop", 1, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, transformOrigin:"right top"});
      gsap.timeline().from("#main-lefttop", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().from("#main-leftbottom", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().from("#main-center", {opacity: 0, y: -1000, ease: Power3.easeIn}).duration(1);
      gsap.timeline().from("#main-card-earn", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().from("#main-card-borrow", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().from("#main-card-stocks", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().from("#main-card-cards", {opacity: 0, x: 500}).duration(1);
      gsap.timeline().from("#main-righttop", {opacity: 0, scale: 0, transformOrigin:"right top"}).duration(1);
    }
    if (props.state === 'exiting') {
      gsap.timeline().to("#main-lefttop", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().to("#main-leftbottom", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().to("#main-center", {opacity: 0, y: -1000, ease: Power3.easeIn}).duration(1);
      gsap.timeline().to("#main-card-earn", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().to("#main-card-borrow", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().to("#main-card-stocks", {opacity: 0, y: -500}).duration(1);
      gsap.timeline().to("#main-card-cards", {opacity: 0, x: 500}).duration(1);
      gsap.timeline().to("#main-righttop", {opacity: 0, scale: 0, transformOrigin:"right top"}).duration(1);
    }
    return function unmount() {}
  }, [props.state]);
  return (
    <div className='relative w-full min-h-[1200px] pt-[170px] pb-[110px] md:pb-[40px] md:pt-0 bg-main-background dark:bg-main-background-dark bg-center bg-cover transition-all duration-1000'>
      <div id='main-lefttop' className='absolute top-[100px] right-0 w-[232px] h-[130px] md:top-[210px] md:left-[10%] md:w-[464px] md:h-[260px] bg-main-lefttop dark:bg-main-lefttop-dark bg-center bg-cover'></div>
      <div id='main-leftbottom' className='absolute top-[40%] right-0 w-[300px] h-[290px] md:bottom-0 md:left-[10%] md:w-[672px] md:h-[633px] bg-main-leftbottom dark:bg-main-leftbottom-dark bg-center bg-cover'></div>
      <div id='main-righttop' className='absolute bottom-0 right-0 w-[300px] h-[325px] md:top-[71px] md:right-[12px] md:w-[750px] md:h-[797px] bg-main-righttop dark:bg-main-righttop-dark bg-center bg-cover'></div>
      <div id='main-center' className='absolute left-[-50px] top-[20%] w-[275px] h-[225px] md:left-[calc(50%-280px)] md:top-[calc(50%-170px)] md:w-[550px] md:h-[450px] bg-main-center dark:bg-main-center-dark bg-center bg-cover z-10 pointer-events-none'></div>
      <span className='absolute top-[100px] w-full text-center block md:hidden font-semibold text-[40px] leading-[48px] tracking-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Dashboard</span>
      <Card
        id='main-card-earn'
        url='/earn'
        img='bg-main-card-earn-banner'
        video="/dashboard-banner-earn.mp4"
        className="relative ml-[20px] md:ml-0 md:absolute md:left-[calc(50%-450px)] md:top-[250px] z-20 md:z-10"
        title1="Earn with 5% APY"
        btnTitle="Earn"
        description={<div><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Earn</span> on your deposits. Withdraw anytime.</div>}
      />
      <Card
        id='main-card-borrow'
        url='/borrow'
        img='bg-main-card-borrow-banner'
        video="/dashboard-banner-borrow.mp4"
        className="relative ml-[calc(100%-300px)] md:ml-0 mt-[30px] md:mt-0 md:absolute md:right-[calc(50%-450px)] md:top-[320px]"
        title1="Borrow instantly"
        title2="Loan repays itself"
        btnTitle="Borrow"
        description={<div><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Borrow</span> up to <span className='text-[#00DDA2]'>50%</span> of your collateral. No repayments. Your yield pays off your loan!</div>}
      />
      <Card
        id='main-card-cards'
        url='/cards'
        img="bg-main-card-cards-banner w-[123px] md:w-[168px] h-[180px] md:h-[246px]"
        className="relative ml-[20px] md:ml-0 mt-[30px] md:mt-0 md:absolute md:left-[calc(50%-450px)] md:top-[650px]"
        title1="No Fees. Crypto"
        title2="Mastercards"
        btnTitle="Cards"
        description={<div><p>Crypto or Fiat, for choice.</p><br /><p>Connect to your cards & enjoy your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>MAUI</span> Benefits</p></div>}
      />
      <Card
        id='main-card-stocks'
        url='/stocks'
        img='bg-main-card-stocks-banner'
        video="/dashboard-banner-stocks.mp4"
        className="relative ml-[calc(100%-300px)] mb-[70px] md:mb-0 md:ml-0 mt-[30px] md:mt-0 md:absolute md:right-[calc(50%-450px)] md:top-[720px] z-20"
        title1="Neutral strategy"
        btnTitle="Stocks"
        description={<div><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Delta Neutral</span><br/>Strategy with one click.</div>}
      />
    </div>
  )
}

export default Main;