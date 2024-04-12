const Button = (props: {
    onClick: any;
    variant?: string; // darkgreen, lightgreen
    color?: string;
    type?: "button" | "submit" | "reset" | undefined;
    name: string;
    disabled?: boolean
    height?: string;
    className?: string;
}) => {
    let className = '';
    if (props.variant === 'primary') {
        className = 'bg-yellow-500 text-gray-900 uppercase border border-[#00000]'
    } else if (props.variant === 'secondary')
        className = 'bg-slate-700 text-gray-300 uppercase border border-[#00000]'
    else if (props.variant === 'darkgold') {
        className = 'bg-yellow-600 text-white border border-[#00000]'
    } else if (props.variant === 'green-outlined') {
        className = 'bg-white text-darkgreen border-2 border-darkgreen'
    } else {
        className = ' text-gray-800 border border-[#00000] z-[1]'
    }
    return (
        <button type={props.type} name={props.name} onClick={props.onClick} className={`${className} py-1 md:p-2 px-3 md:px-6  flex items-center rounded-[10px]  font-lato font-semibold text-sm active:scale-95 duration-300 ${props.disabled ? 'opacity-80' : 'cursor-pointer'} ${props.className}`} disabled={props.disabled}>
            {props.name}
        </button>
    );
}

export default Button;