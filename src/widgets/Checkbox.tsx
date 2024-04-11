import '../assets/css/checkbox.css';


const Checkbox = ({ title, id, checked , variant, onSelect, ...other }: any) => {
  let labelClass = 'text-sm font-lato text-black';
  if (variant === 'boldNormal')
    labelClass = 'text-normal font-bold font-lato  leading-[16px] text-black';
  else if (variant === 'mediumNormal')
    labelClass = 'text-normal font-medium font-lato leading-[16px] text-black';
  return (
    <div className="flex items-center gap-1">
      <input onChange={(e) => onSelect(e.target.checked)} className=' bg-registerBg shadow-edge reset-appearance overflow-hidden rounded-[2px]' checked={checked} type="checkbox" id={id}  {...other} />
      {title && (
        <label  className={`${labelClass}`} htmlFor={id}>
          {title}
        </label>
      )}
    </div>
  )
}

export default Checkbox