import React, { useEffect } from "react";

function AssetProtect() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-[920px] md:min-h-[1000px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000">
      {/* card */}
      <div className="absolute w-[320px] top-[130px] left-[calc(50%-160px)] md:w-[1020px] md:top-[240px] md:left-[calc(50%-510px)] bg-borrow-card dark:bg-borrow-card-dark shadow-borrow-card dark:shadow-borrow-card-dark border border-[#FFFFFF] rounded-[33px] p-[20px] md:p-[40px] md:pt-[20px]">
        <span className="font-semibold text-[18px] md:text-[32px] leading-[36px] md:leading-[48px] tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]">
          Asset protection program on Maui
        </span>
        <div className="mt-[20px] h-[540px] overflow-y-scroll scrollbar">
          <pre className="whitespace-pre-wrap break-words text-[11px] md:text-[14px] text-container">
            <p>
              <strong>Funds are covered against hacks</strong>
            </p>
            <p>
              Assets on Maui are protected. We provide coverage, which is
              different from insurance. Since we are not a bank, we are not FDIC
              insured, but have the best available coverage on the assets
              deposited through Maui. You can read below for more information on
              how your funds are protected while using Maui. Maui uses many
              partners, one of them is a custody partner. This means that Maui
              does not directly hold your funds, these funds are instead held by
              our custody partner. Our custody partner provides SOC II type 2
              security. The coverage that we have on Maui is the best coverage
              available for your digital assets.
            </p>
            <p>
              <br />
              &nbsp;
            </p>
            <p>
              <strong>How your funds are protected</strong>
            </p>
            <p>
              At Maui the most important thing is protecting your assets. We
              protect and guard your assets from theft while funds are in
              custody, as well as when funds are in transit.
            </p>
            <p>
              We have a direct partnership with one of our lending partners to
              make Maui as safe as possible from hacks. Our custody solution
              partner is SOC II type 2 approved. This is a great article that
              goes into detail about how strict, and what the SOC verification
              process is like. Stock markets, exchanges and other regulated
              entities have similar SOC requirements that must be met in order
              to operate.
            </p>
            <p>
              Funds are stored by FireBlocks which also protects you against
              Maui going out of business, shutting down, or disappearing with
              your funds.
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

export default AssetProtect;
