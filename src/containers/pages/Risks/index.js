import React, { useEffect } from "react";

function Risks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-[920px] md:min-h-[1000px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000">
      {/* card */}
      <div className="absolute w-[320px] top-[130px] left-[calc(50%-160px)] md:w-[1020px] md:top-[240px] md:left-[calc(50%-510px)] bg-borrow-card dark:bg-borrow-card-dark shadow-borrow-card dark:shadow-borrow-card-dark border border-[#FFFFFF] rounded-[33px] p-[20px] md:p-[40px] md:pt-[20px]">
        <span className="font-semibold text-[18px] md:text-[32px] leading-[36px] md:leading-[48px] tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]">
          What are the risks associated with using Maui?
        </span>
        <div className="mt-[20px] h-[540px] overflow-y-scroll scrollbar">
          <pre className="whitespace-pre-wrap break-words text-[11px] md:text-[14px] text-container">
            <p>
              Assets deposited onto Maui utilize FireBlocks as the primary
              custodian. FireBlocks is SOC Type II compliant and receives
              regular pen testing from ComSec and NCC Group. You can read more
              about what exactly SOC type II compliant means, and how it
              protects you here.
            </p>
            <p>
              To earn rewards, our partners lend assets deposited onto Maui to
              heavily vetted institutions. Our lending partners have risk and
              finance teams that work collaboratively to review these
              institutions before allowing them to become a borrower. Some
              borrowers are also required to over-collateralize their loans in
              order to borrow assets.
            </p>
            <p>
              Please note that digital currency is not legal tender, is not
              backed by the government, and is not subject to FDIC or SIPC
              protections. This is not a risk free product.
            </p>
            <p>
              <br />
              &nbsp;
            </p>
            <p>
              <strong>MAUI CONTACT DETAILS</strong>
            </p>
            <p>Address:</p>
            <p>US - 2100 Geng Road. Palo Alto, CA 94303, USA</p>
            <p>EU - Place de la Synagogue 5 1204 Geneve, SWITZERLAND</p>
            <p style={{ marginRight: "8px" }}>Email</p>
            <p>
              <a href="mailto:john@intellabridge.com">ivan@maui.finance</a>
            </p>
            <p style={{ marginRight: "8px" }}>&nbsp;</p>
            <p style={{ marginRight: "8px" }}>Tel.</p>
            <p>
              <a href="tel:+13038005333"> +1 650 600 1357</a>
            </p>
            <p style={{ marginRight: "8px" }}>&nbsp;</p>
            <p style={{ marginRight: "8px" }}>Website</p>
            <p>
              <a href="http://Mauibank.io">Mauibank.io</a>
            </p>
            <p>&nbsp;</p>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Risks;
