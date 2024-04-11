import { ChangeEventHandler } from "react";

const Input = (props: {
    value?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    type?: string;
    name?: string;
    border?: string;
    borderSize?: string;
    background?: string;
    style?: string;
    borderRadius?: string;
    width?: string;
    disableFocusBorder?: boolean
}) => {

    return (
        <input
            name={props.name}
            className={`${props.background ? props.background : 'bg-slate-800'} ${props.style} ${props.borderRadius ? props.borderRadius : 'rounded-r-[5px]'} h-10 text-base font-lato font-medium  px-[10px] ${props.width || "w-full"} ${props.border ? props.border : 'border-none'} ${props.borderSize ? `border-[${props.borderSize}]` : ''} ${props.disableFocusBorder ?? false ? "focus:outline-none" : ""}`}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default Input;