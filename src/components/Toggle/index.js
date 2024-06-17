function Toggle({id="toggleB", label, handleCheckChange, defaultChecked = false}) {
  return (
    <div className="flex items-center justify-center w-full">  
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="mr-3 text-gray-700 dark:text-white font-medium text-[12px] md:text-[14px]">
          {label}
        </div>
        <div className="relative">
          <input type="checkbox" id={id} className="sr-only" defaultChecked={defaultChecked} onClick={handleCheckChange}/>
          <div className="block bg-white dark:bg-gray-600 w-8 h-5 md:w-14 md:h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-[4px] md:top-1 bg-[#1199FA] w-3 h-3 md:w-6 md:h-6 rounded-full transition"></div>
        </div>
      </label>
    </div>
  );
}
export default Toggle;