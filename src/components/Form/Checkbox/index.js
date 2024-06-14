function Checkbox({id, className, checked, children, onChange}) {
  let attributes = {
    id,
    type: 'checkbox',
    // defaultChecked: defaultChecked || false,
    onChange: onChange,
  };
  if (checked !== undefined && checked !== null) {
    attributes.checked = checked;
  }
  return (    
    <label className={`checkbox-container !pl-[36px] md:!pl-[45px] ${className}`}>
      <input {...attributes}/>
      <span className="checkmark !w-[20px] !h-[20px] md:!w-[28px] md:!h-[28px]"></span>
      {children}
    </label>
  )
}

export default Checkbox;