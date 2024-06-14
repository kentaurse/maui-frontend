import ImgVideoBanner from "../../../../components/ImgVideoBanner";

function RightBar({isCrypto}) {
  return (
    <div className='w-full border-b-[1px] border-b-[#777] pb-[10px] md:pb-0 md:border-0'>
      <div className="hidden md:block">
        <div className='text-[#273855] dark:text-[#F9D3B4] text-[14px] md:text-[16px] font-semibold tracking-[1px] transition-all duration-1000'>Features</div>
        <div className='mt-[20px] w-[240px] text-[12px] md:text-[14px] leading-[21px] text-[#7E7E7E] dark:text-[#EDEDF9] transition-all duration-1000'>
          You can now deposit your asset as per your convience.<br /><br />Crypto or Fiat, Your choice. 
        </div>
      </div>
      {isCrypto &&
        <div className="mt-[20px] w-full md:w-[320px]">
          <ImgVideoBanner
            className="flex flex-row md:flex-col justify-evenly items-center md:items-baseline"
            video="/deposit.mp4"
            img="bg-deposit-crypto-saly"
            description={
              <div className="mt-0 md:mt-[20px] tracking-[-0.5px]">
                <div className='w-full md:w-[240px] text-[10px] md:text-[14px] leading-[21px] text-[#7E7E7E] dark:text-[#EDEDF9] transition-all duration-1000'>
                  You can now deposit your asset as per your convience. 
                </div>
                <div className='w-full md:w-[240px] text-[10px] md:text-[14px] leading-[21px] text-[#7E7E7E] dark:text-[#EDEDF9] transition-all duration-1000'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>Crypto or Fiat</span>, Your choice.
                </div>
              </div>
            }
          />
        </div>
      }
      {!isCrypto &&
        <div className='flex flex-row md:flex-col justify-between items-center md:items-baseline'>
          <div className='w-[45%] md:w-[200px] h-[150px] mt-[10px] flex flex-col justify-center items-center'>
            <div className='bg-deposit-fiat-saly rounded-[25px] w-[100px] h-[103px] md:w-[142px] md:h-[145px] bg-cover bg-center transition-all duration-1000' />
          </div>
          <div className="w-[45%] md:w-full">
            <div className='mt-0 md:mt-[20px] text-[#273855] dark:text-[#c5946b] text-[13px] md:text-[16px] font-semibold tracking-[1px] transition-all duration-1000'>About Maui</div>
            <div className='mt-[10px] md:mt-[20px] w-full md:w-[240px] text-[10px] md:text-[14px] leading-[21px] text-[#7E7E7E] dark:text-[#EDEDF9] transition-all duration-1000'>
              Uncomplicated and safe decentralized financial products built to serve everyone fairly with “one click Strategies”.
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default RightBar;