import { useState } from "react";

function ImgVideoBanner({className, video, img, description}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleVideoEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }
  return !isVisible ? (
    <div className={className || 'flex items-center justify-evenly'}>
      {video &&
        <div
          className="relative w-[120px] h-[100px] md:w-[140px] md:h-[120px] cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <div className={`${img} w-full h-full rounded-[22px] bg-cover bg-center`} />
          <div className='absolute bg-common-video-play w-[40px] h-[40px] bg-cover bg-center top-[32px] left-[40px] md:left-[50px] md:top-[44px]' />
        </div>
      }
      {!video &&
        <div className={`bg-cover bg-center rounded-[22px] ${img}`}/>
      }
      <div className='w-[38%] text-[14px] leading-[25px] text-[#000000] dark:text-[#EDEDF9] transition-colors duration-1000'>
        {description}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-evenly rounded-[10px] overflow-hidden">
      <video width="320" height="240" controls muted autoPlay onEnded={handleVideoEnd} >
        <source src={video} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default ImgVideoBanner;