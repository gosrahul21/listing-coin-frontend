import { useEffect, useState } from "react"
import { UpArrowIcon } from "../widgets/icons/UpArrowIcon";
import { DownArrowIcon } from "../widgets/icons/DownArrowIcon";
import userLogo from '../assets/images/user-logo.png'
import { capitalizeFirstLetter } from "../utils";
import { UserType } from "../types/enums/userType";

const RoleDropdown = ({value,  onSelect, items }: { value: any, onSelect: (item: UserType) => void, items: Array<string> }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onClickHandler = () => {
            setOpen((open) => open ? false : open);
        }
        window.addEventListener('click', onClickHandler);
        return () => window.removeEventListener('click', onClickHandler);
    }, [])

    const toggleDropdown = (e: any) => {
        e.stopPropagation();
        setOpen((open) => open ? false : true);
    }

    return <div onClick={toggleDropdown} className={`flex items-center bg-slate-800 relative rounded-3xl border-[0.5px] border-yellow-600  py-[6px] px-[10px] ${open ? 'bg-white rounded-b-none' : ''} font-plusJakartaSans gap-10 cursor-pointer max-w-xs`}>
        <div className="flex gap-2">
            <img className="rounded-full object-fill h-10 w-10" src={userLogo} alt="user-avatar" />
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-base leading-4">{value?.user?.firstName}</span>
                <span className="font-normal text-sm leading-4">{capitalizeFirstLetter(value?.selectedRole || "")}</span>
            </div>
        </div>
        {open ? <UpArrowIcon /> : <DownArrowIcon />}
        <div className={`absolute z-10 left-0 right-0 top-[100%] ${open ? 'flex flex-col items-center' : 'hidden'} w-full bg-slate-800 shadow-md  rounded-b-xl `}>

            {items?.map((item, index: number) => (<div onClick={()=>onSelect(item as any)} className={`text-[#000000] font-lato text-sm text-center hover:bg-slate-800 leading-[16.8px] ${index===items.length-1?'rounded-b-xl ':''} text-gray-100 font-normal py-3 border-[0.5px] w-full border-yellow-600 `}>
                {capitalizeFirstLetter(item)}
            </div>))}
        </div>
    </div>
}

export default RoleDropdown