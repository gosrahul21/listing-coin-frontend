// export const StyledDropwDownContent = styled.div`
//     position: absolute ;
//     top: 100%;
//     left:0;
//     right:0 ;
//     z-index: 100;
//     color: white;
//     background:${styledconfig.backgroundColor.backgroundStyle2};
//     div{
//         padding: 5px 10px;
//         text-align: center;
//         background: ${styledconfig.backgroundColor.backgroundStyle2};
//         &:hover {
//             background: ${styledconfig.colors.lightgray};
//         }
//     }
// `

import { useEffect, useState } from "react";
import { UpArrowIcon } from "../widgets/icons/UpArrowIcon";
import { DownArrowIcon } from "../widgets/icons/DownArrowIcon";
import { capitalizeFirstLetter } from "../utils";

const CustomDropdown = (props: {
  value: string;
  onSelect: (e: string) => void;
  items: Array<string>;
  variant?: string;
  background?: string;
  width?: string;
  borderRadius?: string;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClickHandler = () => {
      setOpen((open) => (open ? false : open));
    };
    window.addEventListener("click", onClickHandler);
    return () => window.removeEventListener("click", onClickHandler);
  }, []);

  const toggleDropdown = (e: any) => {
    e.stopPropagation();
    setOpen((open) => (open ? false : true));
  };
  const className =
    props.variant === "trade"
      ? `shadow-dropdownBorder h-[40px] pl-[17px] pr-[12px] text-black ${
          props.background
        } ${
          props.borderRadius ? props.borderRadius : "rounded-r-[5px]"
        } justify-between`
      : null;
  return (
    <div
      onClick={toggleDropdown}
      className={`flex items-center ${props.width} relative ${
        open ? "bg-white rounded-b-none" : ""
      } ${className} text-black text-base font-lato font-medium leading-[22px] gap-1 cursor-pointer px-2`}
    >
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base leading-4">{capitalizeFirstLetter(props.value)}</span>
      </div>
      {open ? (
        <UpArrowIcon />
      ) : (
        <DownArrowIcon variant={props.variant === "trade" ? "gray" : "black"} />
      )}
      <div
        className={`absolute z-10 left-0 right-0 top-[100%] ${
          open ? "flex flex-col items-center" : "hidden"
        } w-full bg-white rounded-b-[50px]`}
      >
        {props.items.map((item) => (
          <div
            onClick={() => props.onSelect(item)}
            className="text-[#000000] font-lato text-sm text-center leading-[16.8px] font-normal py-[10px] shadow-dropdownBorder w-full bg-white hover:bg-lightGreen"
          >
            {capitalizeFirstLetter(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
