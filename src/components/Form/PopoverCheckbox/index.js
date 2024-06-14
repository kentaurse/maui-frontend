import { useState } from 'react';
import { Popover } from 'react-tiny-popover'

function PopoverCheckbox(props) {  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);	
  const [isChecked, setIsChecked] = useState(false);	

  const handleCheckChange = (e) => {
    if (!isPopoverOpen && !isChecked) {
      setIsPopoverOpen(true);
      setIsChecked(false);
      props.onChange(false);
      return;
    }
    if (isChecked) {
      setIsChecked(false);
      props.onChange(false);
    }
  }
  const handlePopoverChange = (e) => {
    setIsPopoverOpen(false);
  }
  const handleAgreeClick = () => {
    setIsPopoverOpen(false);
    setIsChecked(true);
    props.onChange(true);
  }
  return (
    <div className={props.className || ''}>
      <Popover
        isOpen={isPopoverOpen}
        positions={['top']} // preferred positions by priority
        align='start'
        padding={10}
        onClickOutside={handlePopoverChange}
        content={
          <div className='ml-[-20px]'>
            <div className='rounded-md border border-[#00214732] p-5 bg-[#ffffff] m-auto max-w-[90%] md:max-w-[600px]'>
              <div className='w-full h-full'>
                <div className='h-[300px] overflow-y-auto p-0 text-[#3f556e] text-[14px] scrollbar'>
                  {props.children}
                </div>
                <div className='flex justify-center mt-[10px]'>
                  <button
                    onClick={handleAgreeClick}
                    type="button"
                    className=' font-bold p-6 pt-[16px] pb-[16px] border-0 active:shadow-lg rounded-[4px] bg-[#3989e3] hover:bg-[#1e75d7] text-[#ffffff] text-[14px]'
                  >
                    I AGREE
                  </button>
                </div>
              </div>
            </div>
            <span className='arrow left-[-14px]' />
          </div>
        }
      >
        <label className="flex items-baseline cursor-pointer" htmlFor={props.id}>
          <input
            className=""
            type="checkbox"
            onChange={handleCheckChange}
            checked={isChecked}
            id={props.id}
          />
          <div className='text-sm leading-3 ml-3 cursor-pointer'>{props.label}</div>
        </label>
      </Popover>
    </div>
  )
}

export default PopoverCheckbox;