import { useHistory } from "react-router-dom";
import ImgVideoBanner from "../../../components/ImgVideoBanner";

function Card({id, className, img, video, title1, title2, description, btnTitle, url}) {
  const history = useHistory();
  function handleClick(){
    history.push(url);
  }
  return (
    <div id={id} className={`w-[280px] md:w-[340px] p-[18px] md:p-[24px] bg-main-card dark:bg-main-card-dark rounded-[26px] border border-[#FFFFFF68] shadow-main-card dark:shadow-main-card-dark ${className}`}>
      <div className='text-center'>
        <span className='font-semibold text-[18px] leading-[27px] md:text-[24px] md:leading-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#39C6D9] via-[#B84ADE] to-[#DE1F4D]'>
          {title1}
        </span>
      </div>
      <div className='text-center'>
        <span className='font-semibold text-[18px] leading-[27px] md:text-[24px] md:leading-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#39C6D9] via-[#B84ADE] to-[#DE1F4D]'>
          {title2}
        </span>
      </div>
      
      <div className='mt-[12px] md:mt-[20px]'>
        <ImgVideoBanner
          img={img}
          video={video}
          description={description}
        />
      </div>
      <div className='mt-[12px] md:mt-[20px] pl-[5px] pr-[5px] md:p-0 w-full'>
        {id === 'main-card-stocks' &&
          <button
            onClick={handleClick}
            className='bg-gradient-to-r from-[#1199FA] to-[#00DDA2] shadow-main-card-btn rounded-[16px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-[2px] w-full'
          >
            <div className='bg-[#ffffff] dark:bg-[#32283C] rounded-[16px] text-[#000000] p-2'>
              <span className='font-semibold text-[14px] md:text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]'>{btnTitle}</span>
            </div>
          </button>
        }
        {id !== 'main-card-stocks' &&
          <button
            onClick={handleClick}
            className='bg-main-card-btn shadow-main-card-btn rounded-[16px] text-[16px] md:text-[20px] p-[4px] md:p-[8px] text-[#F0F5F9] tracking-[3px] w-full'
          >
            {btnTitle}
          </button>
        }
      </div>
    </div>
  )
}

export default Card;