import { useEffect, useState } from 'react';

function OneSlider(props) {
  return (
    <div className={`${props.className}`}>
      <div className='flex justify-between items-center'>
        <div className='text-[16px] text-[#273855] dark:text-[#F9D3B4] tracking-[1px]'>{props.title}</div>
        <div className='rounded-[8px] border-0 dark:border-[2px] text-[#273855] dark:text-[#728AB7] border-[#FFF] bg-[#EBEBF8] shadow-lg dark:shadow-none dark:bg-[#271B2D] p-[2px] pl-[16px] pr-[16px]'>{props.value}{props.subfix}</div>
      </div>
      <input className='mt-[5px] w-full cursor-pointer' type="range" min={props.min} max={props.max} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  )
}

function CustomSlider(props) {
  const { onChange } = props;
  const [ collateral, setCollateral ] = useState(0);
  const [ borrowed, setBorrowed ] = useState(0);
  const [ apy, setApy ] = useState(0);
  useEffect(() => {
    onChange(collateral, borrowed, apy);
  }, [onChange, collateral, borrowed, apy]);
  return (
    <div className='p-[20px]'>
      <OneSlider
        title="Collateral:"
        min={0}
        max={100000}
        value={collateral}
        onChange={(val) => {
          console.log('val', val);
          setCollateral(val);
          if (val < borrowed) {
            setBorrowed(val);
          }
        }}
      />
      <div className='mt-[40px]'/>
      <OneSlider        
        title="Borrowed:"
        min={0}
        max={50000}
        value={borrowed}
        onChange={(val) => {
          if (val <= collateral) {
            setBorrowed(val);
          }
        }}
      />
      <div className='mt-[40px]'/>
      <OneSlider
        title="APY:"
        min={0}
        max={50}
        value={apy}
        subfix="%"
        onChange={(val) => {
          setApy(val);
        }}
      />
    </div>
  )
}

export default CustomSlider;