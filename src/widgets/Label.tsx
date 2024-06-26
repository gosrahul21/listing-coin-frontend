const Label = ({value, style, variant}: {value: string, style?: any, variant?: string})=>{
    let className = "text-sm md:text-base leading-[19.2px] font-bold text-gray-100 whitespace-nowrap";
    if(variant==='dark-black')
        className = 'font-lato text-base leading-4 font-bold text-black ';
    return <label className={className} style={style}>{value}</label>
};

export default Label;