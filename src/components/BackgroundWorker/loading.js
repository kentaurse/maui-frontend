function LoadingIcon () {
  const width = 40;
  const height = 40;
  const fill = '#000000';
  return (
    <div className='w-[40px] h-[40px] m-auto'>
      <svg width={width} height={height} viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <g transform="translate(2 1)" stroke={fill} strokeWidth="1.5">
                <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="1;0;0;0;0;0;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;1;0;0;0;0;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;1;0;0;0;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;0;1;0;0;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;0;0;1;0;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;0;0;0;1;0;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;0;0;0;0;1;0" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="5" r="5" fillOpacity="0" fill={fill}>
                    <animate attributeName="fill-opacity"
                          begin="0s" dur="1.3s"
                          values="0;0;0;0;0;0;0;1" calcMode="linear"
                          repeatCount="indefinite" />
                </circle>
            </g>
        </g>
      </svg>
    </div>
  )
}

export default LoadingIcon;