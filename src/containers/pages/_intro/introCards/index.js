import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import useWindowSize from "../../../../utils/useWindowSize";

function IntroCards() {
  let history = useHistory();
  const size = useWindowSize();

  const [isMobile, setIsMobile] = useState(false);
  const [enterCard, setEnterCard] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setEnterCard(true)
  }, []);

  useEffect(() => {
    if (size.width <= 768) setIsMobile(true);
    else setIsMobile(false);
  }, [size]);

  return (
    <div className="bg-[#10213f] pb-[60px]">
      <div className="w-full md:h-[10vh] bg-[#001535]"></div>
      <div
        className={`absolute w-full ${
          isMobile ? "h-[100vh]" : ""
        } md:pb-[60px] bg-[#061121] bg-cover bg-left overflow-hidden card-in`}
      >
        <div className="w-full mt-[18vh]"></div>
        <div className="text-[14px] md:text-[24px] leading-[24px] leading-[119.7%] font-[500] md:font-[600] text-[#1199FA] text-center">
          Hello, MAUI.
        </div>
        <div className="text-[30px] md:text-[75.4px] leading-[119.7%] font-[600] text-[#FFF] text-center">
          <span className="drop-shadow-[0_0_4px_#FFFFFF] md:drop-shadow-[0_0_9.42466px_#1199FA]">
            WHITE{" "}
          </span>{" "}
          <span className="md:text-[72px] text-[#1199FA]">Card</span>
        </div>
        <div className="w-[96%] mx-auto text-[64px] md:text-[128px] leading-[119.7%] font-[600] md:font-[500] text-[#1199FA] text-center">
          Your choice.
        </div>
        <div className="relative mt-[10vh] mx-auto w-[80%] md:w-[40%] h-[calc(80vw*246/391+50px)] md:h-[calc(40vw*246/391+100px)]">
          {/* <div className="absolute top-0 left-[5vw] w-[60vw] md:w-[30vw] h-[calc(60vw*250/373)] md:h-[calc(30vw*250/373)] bg-introborrow-card1 bg-cover bg-center"></div> */}
          <div className="absolute top-[0px] w-[80vw] md:w-[40vw] h-[calc(80vw*418/558)] md:h-[calc(40vw*418/558)] bg-introborrow-card1 bg-cover bg-center"></div>
        </div>
      </div>
      <div
        className={`relative w-full ${
          isMobile ? "h-[100vh]" : ""
        } md:pb-[60px] bg-[#cdd5e6] bg-cover bg-left  overflow-hidden card-out`}
      >
        <div className="w-full mt-[18vh]"></div>
        <div className="text-[14px] md:text-[24px] leading-[24px] leading-[119.7%] font-[500] md:font-[600] text-[#1199FA] text-center">
          Hello, MAUI.
        </div>
        <div className="text-[30px] md:text-[75.4px] leading-[119.7%] font-[600] text-[#000] text-center">
          <span className="drop-shadow-[0_0_4px_#FFFFFF] md:drop-shadow-[0_0_9.42466px_#1199FA]">
            Black{" "}
          </span>{" "}
          <span className="md:text-[72px] text-[#1199FA]">Card</span>
        </div>
        <div className="w-[96%] mx-auto text-[64px] md:text-[128px] leading-[119.7%] font-[600] md:font-[500] text-[#1199FA] text-center">
          Your choice.
        </div>
        <div className="relative mt-[10vh] mx-auto w-[80%] md:w-[40%] h-[calc(80vw*246/391+50px)] md:h-[calc(40vw*246/391+100px)]">
          {/* <div className="absolute top-0 left-[5vw] w-[60vw] md:w-[30vw] h-[calc(60vw*250/373)] md:h-[calc(30vw*250/373)] bg-introborrow-card1 bg-cover bg-center"></div> */}
          <div className="absolute top-[0px] w-[80vw] md:w-[40vw] h-[calc(80vw*418/558)] md:h-[calc(40vw*418/558)] bg-introborrow-card4 bg-cover bg-center"></div>
        </div>
      </div>
      <div className="md:w-full h-[100vh] md:h-[80vh] md:px-[12%] flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="w-[80%] md:w-[35vw]">
          <div className="text-[54px] md:text-[64px] leading-[119.7%] font-[600] text-[#1199FA] text-center md:text-left">
            Select Your Maui Card
            <span className="text-[#FFF] md:text-[#d33b0e]">.</span>
          </div>
          <div className="mt-[15px] text-[14px] md:text-[18px] leading-[17px] md:leading-[21px] font-[400] text-[rgba(255,255,255,0.77)] text-center md:text-left">
            Be one of the first cardholders of Maui and make history. Make
            deposits and receive 5% APY, that's a better return than any bank
            across the globe. Borrow up to 50% of your collateral instantly and
            permissionless.
          </div>
        </div>
        <div className="mt-[15px] md:mt-0 w-[90%] md:w-[35vw] h-[calc(90vw*249/378)] md:h-[calc(35vw*249/378)] bg-introborrow-ivancard bg-cover bg-center translate-x-[-2vw]"></div>
      </div>
      <div className="w-[96%] md:w-[70%] mt-[80px] md:mt-[100px] mx-auto text-[48px] md:text-[64px] leading-[48px] md:leading-[76px] font-[600] text-[#1199FA] text-center">
        Spend your fiat or digital assets with minimum fees
        <span className="md:text-[#b169a8]">.</span>
      </div>
      <div className="relative mt-[70px] w-[90%] md:w-[65%] md:min-w-[700px] mx-auto h-[calc(88vw*479/857)] md:h-[calc(50vw*479/857)]">
        <div
          className={`absolute left-[3vw] top-0 w-[88vw] md:w-[50vw] h-[calc(88vw*479/857)] md:h-[calc(50vw*479/857)] bg-introborrow-maccom bg-cover bg-center ${
            isMobile ? "z-10" : "z-40"
          }`}
        ></div>
        <div className="absolute left-[5vw] md:left-[3vw] top-[15vw] md:top-[5vw] w-[14vw] md:w-[9vw] h-[calc(14vw*298/148)] md:h-[calc(9vw*298/148)] bg-introborrow-iPhone bg-cover bg-center z-10"></div>
        <div className="absolute right-[-5vw] md:right-0 top-[18vw] md:top-[5vw] w-[50vw] md:w-[40vw] h-[calc(50vw*308/645)] md:h-[calc(40vw*308/645)] bg-introborrow-comimage bg-cover bg-center z-10"></div>
      </div>
      <div className="mt-[40px] mx-auto w-[80%] md:w-[55%] text-[16px] md:text-[20px] leading-[19px] md:leading-[24px] font-[400] text-[#FFF] text-center">
        Get access to unmatched high yields on your money impossible for your
        legacy bank. A new banking system to serve YOU.*
      </div>
      <div className="w-[202px] md:w-[250px] h-[68px] md:h-[74px] mx-auto mt-[60px] rounded-[4px] md:rounded-[31.5px] bg-[#1199FA] text-[#fff] text-[32px] md:text-[31.8px] leading-[38px] md:leading-[45px] font-[500] flex justify-center items-center cursor-pointer"
      onClick={() => history.push("/dashboard")}
      >
        Start Now
      </div>
      <div className="w-[80%] md:w-[60%] mx-auto mt-[50px] md:mt-[70px] text-[8px] md:text-[14px] leading-[10px] md:leading-[17px] font-[600] text-[#6f6f6f] text-center">
        Copyright © 2022 Maui Finance. All rights reserved.Privacy Policy Terms
        and Conditions Legal
      </div>
    </div>
  );
}

export default IntroCards;
