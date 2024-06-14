function Tab({className, tabIndex, onChange}) {
  const className_active = 'bg-[#EDEDF9] dark:bg-[#271B2D] shadow-deposit-tab w-[110px] border-b-[#1199FA] p-2 text-[#1199FA] text-center cursor-pointer';
  const className_inactive = 'bg-deposit-tab-inactive dark:bg-deposit-tab-inactive-dark  w-[110px] border-b-[#1199FA] p-2 text-[#000000] dark:text-[#FFFFFF] text-center cursor-pointer';
  const border = <div className='w-[1px] h-[40px] pt-[5px] pb-[5px] bg-deposit-tab-inactive dark:bg-deposit-tab-inactive-dark'><div className="border-[1px] border-[#AAAAAA] h-full" /></div>;
  return (
    <div className={`${className}`}>
      <div
        className={`${tabIndex === 0 ? className_active: className_inactive} rounded-tl-[12px]`}
        onClick={onChange.bind(this, 0)}
      >
        Deposit
      </div>
      {tabIndex === 2 && border}
      <div
        className={`${tabIndex === 1 ? className_active: className_inactive}`}
        onClick={onChange.bind(this, 1)}
      >
        Withdraw
      </div>
      {tabIndex === 1 && <div className='w-[1px] h-[40px] pt-[5px] pb-[5px] bg-deposit-tab-inactive dark:bg-deposit-tab-inactive-dark'/>}
      {tabIndex === 0 && border}
      <div
        className={`${tabIndex === 2 ? className_active: className_inactive} rounded-tr-[12px]`}
        onClick={onChange.bind(this, 2)}
      >
        Transfer
      </div>
    </div>
  )
}
export default Tab;