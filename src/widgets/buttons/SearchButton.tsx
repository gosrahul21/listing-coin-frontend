import { SearchIcon } from "../icons/SearchIcon";

const SearchButton = (props: {
    onClick: any;
    variant?: string; // darkgreen, lightgreen
    color?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean,
    name?: string
}) => {
    return (
        <button type={props.type} name={props.name} onClick={props.onClick} className={`${props.variant?`bg-${props.variant}`:"bg-darkgreen"} ${props.color ? `text-${props.color}`: 'text-white'} h-[30px] w-[30px] flex items-center justify-center rounded-[2px]  ${props.disabled?'opacity-80':'cursor-pointer'}`} disabled ={props.disabled}>
            <SearchIcon/>
        </button>
    );
}

export default SearchButton;