import React, { useEffect } from "react";

function Fees() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-[920px] md:min-h-[1000px] bg-[#DEE2E8] dark:bg-[#32283C] transition-all duration-1000">
      {/* card */}
      <div className="absolute w-[320px] top-[130px] left-[calc(50%-160px)] md:w-[1020px] md:top-[240px] md:left-[calc(50%-510px)] bg-borrow-card dark:bg-borrow-card-dark shadow-borrow-card dark:shadow-borrow-card-dark border border-[#FFFFFF] rounded-[33px] p-[20px] md:p-[40px] md:pt-[20px]">
        <span className="font-semibold text-[18px] md:text-[32px] leading-[36px] md:leading-[48px] tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]">
          Fees
        </span>
        <div className="mt-[20px] h-[540px] overflow-y-scroll scrollbar">
          <pre className="whitespace-pre-wrap break-words text-[11px] md:text-[14px] text-container">
            <p>
              <strong>MAUI FEE</strong>
            </p>
            <p>
              Maui charges a standard transaction fee for currency exchanges.
              This is the only fee associated with Maui, there are no other
              hidden fees. The fees are calculated as follows:
            </p>
            <p>
              <br />
              &nbsp;
            </p>
            <div className="flex flex-row items-center">
              -{" "}
              <span className="mr-[5px]">
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f1fa_1f1f8/32.png"
                  className="w-[20px] h-[20px]"
                />
              </span>{" "}
              Domestic US. Apple Pay, Debit Card, Credit Card:
            </div>
            <p className="ml-[20px]">
              $5 minimum fee or 3.4% + 30c, whichever is greater.
            </p>
            <p>
              <br />
              &nbsp;
            </p>
            <div className="flex flex-row items-center">
              -{" "}
              <span className="mr-[5px]">
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f30e/32.png"
                  className="w-[20px] h-[20px]"
                />
              </span>{" "}
              International. Apple Pay, Debit Card, Credit Card:
            </div>
            <p className="ml-[20px]">
              $5 minimum fee or 4.4% + 30c, whichever is greater
            </p>
            <p>
              <br />
              &nbsp;
            </p>
            <p>
              <strong>NETWORK FEES</strong>
            </p>
            <p>
              To ensure that transactions are processed on the blockchain
              network, outgoing transfers sent to external wallet addresses are
              charged a "mining" or "network" fee. This fee is paid directly to
              the miners, Maui does not profit from sending or receiving any of
              our Supported Currencies.
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

export default Fees;
