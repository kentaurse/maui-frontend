import Loading from "./loading";

function Button(props) {
  const { children, className, isDisabled, isLoading, onClick, ...rest } = props;
  let cn = props.className || "";
  if (isDisabled || isLoading) {
    cn += ' text-[#6c757d] disabled:bg-[#bbb] disabled:bg-none disabled:cursor-no-drop';
  }
  return (
    <button
      {...rest}
      className={cn}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (<div className="flex flex-col items-center">
        <Loading width={24} height={24} fill="#FFF"/>
      </div>)
      : props.children}
    </button>
  )
}

export default Button;