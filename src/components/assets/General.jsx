export function ArrowLeftImgIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '30'}
      height={props.height || '30'}
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path
        d='M14 16L10 12L14 8'
        stroke={props.stroke || 'black'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}