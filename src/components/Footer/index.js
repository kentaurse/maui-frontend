import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import useWindowSize from "../../utils/useWindowSize";
import twitterLogo from "../../assets/images/_common/twitter.png"
import linkedinLogo from "../../assets/images/_common/linkedin.png"

function Footer(props) {
  const { location } = props;
  const history = useHistory();

  const [isMobile, setIsMobile] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);

  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) setIsMobile(true);
    else setIsMobile(false);
  }, [size]);
  const handlePrivacyClick = () => {
    history.push("/privacy");
  };
  const handleTermsClick = () => {
    history.push("/terms");
  };
  const handleAssetProtectClick = () => {
    history.push("/assetprotect");
  };
  const handleUserAgreementClick = () => {
    history.push("/useragreement");
  };
  const handleRisksClick = () => {
    history.push("/risks");
  };
  const handleFeesClick = () => {
    history.push("/fees");
  };
  if (location.pathname === "/splash" || location.pathname === "/login")
    return null;
  return (
    <div className="relative h-[685px] md:w-full md:h-[568px] bg-[#001535]">
      {/* <div className="pt-[49px] px-[31px] text-[24px] leading-[29px] md:px-[14.62%] md:pt-[160px] md:text-[32px] text-[#FFFFFF] font-[500] md:leading-[38px]">
        Get updates on Maui Finance
      </div>
      <div
        className={`mt-[24px] mx-[31px] md:mt-[26px] md:mx-[14.62%] ${
          mouseEntered ? "h-[53px] md:h-[79px]" : "h-[43px] md:h-[59px]"
        } flex items-center transition-all duration-1000`}
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        <input
          className="w-[65%] text-[14px] md:w-[76.92%] h-[43px] pl-[13px] md:h-[59px] md:pl-[19px] bg-transparent border-l-[1px] border-t-[1px] border-b-[1px] md:text-[16px] text-[#FFFFFF]"
          placeholder="Enter your email address"
        />
        <div
          className={`w-[35%] text-[20px] md:w-[23.08%] h-full leading-[33px] md:text-[28px] font-[500] flex items-center justify-center ${
            mouseEntered ? "bg-[#1199FA]" : "bg-[#FFFFFF]"
          } cursor-pointer transition-all duration-1000`}
        >
          Subscribe
        </div>
      </div> */}
      <div className="w-full h-[46px] md:h-0"></div>
      <div
        className={`relative px-[31px] md:absolute md:mt-0 md:left-[20%] md:px-0 md:top-[100px] md:w-[60%] flex flex-col md:flex-row md:justify-between`}
      >
        <div className="">
          <div className="mb-[10px] leading-[29px] text-[24px] font-[600] md:mb-[13.9px] md:leading-[33px] md:text-[28px] text-[#FFFFFF] md:font-[500]">
            Contact Us
          </div>
          <div className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer">
            <a href="mailto:ivan@maui.finance" target="_blank">
              ivan@maui.finance
            </a>
          </div>
          <div className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer">
            <a href="tel:+13038005333" target="_blank">
              {" "}
              +1 650 600 1357
            </a>
          </div>
          <div className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer">
            <a href="http://Mauibank.io" target="_blank">
              Mauibank.io
            </a>
          </div>
          <div className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer">
            <a href="https://twitter.com/mauibank" target="_blank">
              {" "}
              <img src={twitterLogo} alt="Twitter Logo" className="w-[20px] h-[20px] inline" />{" "}
              @mauibank
            </a>
          </div>
          <div className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer">
            <a href="https://www.linkedin.com/company/mauibank" target="_blank">
              {" "}
              <img src={linkedinLogo} alt="Twitter Logo" className="w-[20px] h-[20px] inline" />{" "}
              @mauibank
            </a>
          </div>
        </div>
        <div className="">
          <div className="mt-[20px] md:mt-0 mb-[10px] leading-[29px] text-[24px] font-[600] md:mb-[13.9px] md:leading-[33px] md:text-[28px] text-[#FFFFFF] md:font-[500]">
            Quick Links
          </div>
          <div
            className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
            onClick={() => history.push("/introdashboard")}
          >
            Maui
          </div>
          {isMobile && (
            <>
              <div
                className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[24px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
                onClick={() => history.push("/introearn")}
              >
                Earn
              </div>
              <div
                className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[24px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
                onClick={() => history.push("/introborrow")}
              >
                Borrow
              </div>
              <div
                className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
                onClick={() => history.push("/introteam")}
              >
                Team
              </div>
            </>
          )}
          <div
            className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
            onClick={() => history.push("/introcards")}
          >
            Cards
          </div>
          <div
            className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
            onClick={() => history.push("/dashboard")}
          >
            Start now
          </div>
        </div>
        {!isMobile && (
          <div className="">
            <div className="mb-[10px] leading-[29px] text-[24px] font-[600] md:mb-[13.9px] md:leading-[33px] md:text-[28px] text-[#FFFFFF] md:font-[500]">
              Developers
            </div>
            <div
              className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
              onClick={() => history.push("/introteam")}
            >
              Team
            </div>
          </div>
        )}
        {!isMobile && (
          <div className="">
            <div className="md:mb-[13.9px] leading-[33px] text-[28px] text-[#FFFFFF] font-[500]">
              Learn
            </div>
            <div
              className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
              onClick={() => history.push("/introearn")}
            >
              Earn
            </div>
            <div
              className="p-[5px] text-[20px] leading-[24px] md:p-0 md:text-[16px] text-[#707070] md:font-[300] md:leading-[29px] cursor-pointer"
              onClick={() => history.push("/introborrow")}
            >
              Borrow
            </div>
          </div>
        )}
      </div>
      <div className="absolute flex flex-col bottom-[36px] w-full md:flex-row items-center justify-between w-[360px] md:w-[65.22%] md:bottom-[104px] mx-[calc((100vw-360px)/2)] md:mx-0 px-[31px] md:left-[17.39%]">
        <div className="text-[10px] mb-[16px] md:mb-[5px] md:text-[14px] dark:text-[#F9D3B4] text-[#ffffff70] text-center">
          Copyright © 2022 Maui Finance. All rights reserved.
        </div>
        <div className="mb-[5px] flex flex-wrap  items-center justify-center text-[12px] md:text-[14px] dark:text-[#F9D3B4] text-[#ffffff70]">
          <span
            onClick={handleTermsClick}
            className="cursor-pointer mr-[2px] pr-[2px]"
          >
            Terms of Service /
          </span>
          <span
            onClick={handleUserAgreementClick}
            className="cursor-pointer mr-[2px] pr-[2px]"
          >
            User Agreement /
          </span>
          <span
            onClick={handlePrivacyClick}
            className="cursor-pointer mr-[2px] pr-[2px]"
          >
            Privacy Policy /
          </span>
          <span
            onClick={handleAssetProtectClick}
            className="cursor-pointer mr-[2px] pr-[2px]"
          >
            Asset Protection /
          </span>
          <span onClick={handleRisksClick} className="cursor-pointer">
            Risks /
          </span>
          <span onClick={handleFeesClick} className="cursor-pointer">
            Fees
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Footer);
