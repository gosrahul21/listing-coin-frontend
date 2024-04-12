import SearchButton from "./buttons/SearchButton";
import { LeftPaginationIcon } from "./icons/LeftPaginationIcon";
import { RightPaginationIcon } from "./icons/RightPaginationIcon";
import { useState, memo } from 'react'

const CustomTable = ({ border, headers, values, onItemClick, page, totalCount, limit, onClickNext, onClickPrev, searchBox, searchBoxValue, onSearchBoxValueChange }: CustomTableProps) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>();


    const onRowClick = (rowValues: any, index: number) => {
        setSelectedRowIndex(index);
        onItemClick && onItemClick(rowValues[headers.length])
    };

    const onNextClick = () => {
        onClickNext();
        setSelectedRowIndex(null);
    }

    const onPrevClick = () => {
        onClickPrev();
        setSelectedRowIndex(null);
    }
    return <div className="w-full ">
        <table className={`w-full block md:table overflow-x-auto  ${border || "rounded-2xl border-separate"}  border border-yellow-500 border-spacing-0`}>
        {/* Table Header */}
        <thead className="bg-yellow-500  font-plusJakartaSans font-bold text-[11px] md:text-base w-full">
            <tr className=''>
                {
                    headers?.map((header: string, index: any) => <th className={`py-[14px] px-5 leading-[22px] ${!border && headers.length - 1 === index && 'rounded-tr-2xl'}`}>{header}</th>)
                }
            </tr>
        </thead>
        {/* Table Body */}
        <tbody className="w-full text-[11px] md:text-base">

            {searchBox && <tr>
                <td colSpan={6}>
                    <div className="flex py-[9.5px] px-[21px] border-none w-full justify-start items-center gap-2">
                        <input onChange={onSearchBoxValueChange} value={searchBoxValue} className="w-[520px] border border-searchBorder h-[30px] rounded-[2px] px-2 font-lato font-medium text-base leading-[22px]" placeholder="Enter Product Code" />
                        <SearchButton onClick={() => { }} />
                    </div>
                </td>
            </tr>}

            {values?.map((rowValues: Array<any>, index: number) => (
                <tr onClick={() => onRowClick(rowValues, index)} key={index} className={`font-lato font-medium text-base leading-[22px] text-gray-100 text-center ${selectedRowIndex === index && 'bg-dullGreen'} ${index % 2 === 1 && selectedRowIndex !== index ? 'bg-fadeTableGray' : ''} cursor-pointer hover:bg-dullGreen`}>
                    {rowValues.map((value: any, valueIndex) => {
                        if(valueIndex===headers.length)
                            return null;
                        return <td className={`shadow-lg py-[14px] w-fit text-sm md:text-base border border-x-0 border-slate-800 ${valueIndex === 0 && 'border-l-[0.5px]'} whitespace-nowrap leading-[22px] px-5 ${values.length === (index + 1) && valueIndex === 0 ? 'rounded-bl-2xl' : ''}  ${values.length === (index + 1) && rowValues.length - 1 === valueIndex ? 'rounded-br-2xl' : ''}`}>{value}</td>
                    })}
                </tr>
            ))}

            {values?.length === 0 ? <tr><td colSpan={headers.length}><div className="flex py-[9.5px] px-[21px] border-none w-full justify-center items-center gap-2">No data available</div></td></tr> : <></>}
        </tbody>
    </table>
        {totalCount ? <div className='flex justify-end w-full gap-3 pt-3'>
            <div className='cursor-pointer' onClick={onPrevClick}><LeftPaginationIcon /></div>
            {page}-{Math.ceil(totalCount / limit)}
            <div className='cursor-pointer' onClick={onNextClick}>
                <RightPaginationIcon />
            </div>

        </div> : <></>}
    </div>
}

export type CustomTableProps = {
    headers: string[],
    values: string[][],
    page: number;
    totalCount: number;
    limit: number;
    onClickNext: () => void;
    onClickPrev: () => void;
    searchBox?: boolean;
    onSearchBoxValueChange?: any;
    searchBoxValue?: string;
    onItemClick?: (itemId: string)=>void;
    border?: string;
}

export default memo(CustomTable);