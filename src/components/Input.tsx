import { ChangeEventHandler } from "react";
import Input from "../widgets/Input";
import Label from "../widgets/Label";

const InputWithLabel = (props: {
    value?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    background?: string;
    label: string;
    type: string;
    vertical?: boolean;
    placeholder?: string;
    border?: string;
    labelStyle?: Object;
})=>{
    return <div className={`flex ${props.vertical?'flex-col gap-[10px]':'flex-row items-center gap-1 '} w-full`}> 
        <Label value={props.label}  style={props.labelStyle}/>
       <Input value={props.value} onChange={props.onChange} type={props.type} style={'bg-slate-800 text-gray-100 rounded-md'} placeholder={props.placeholder} border={props.border} />
    </div>
};

export default InputWithLabel;