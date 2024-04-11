import React, { useEffect, useState } from 'react';
import { LeftPaginationIcon } from '../widgets/icons/LeftPaginationIcon';
import { RightPaginationIcon } from '../widgets/icons/RightPaginationIcon';
import { ScaleLoader } from 'react-spinners';

const TableComponent = ({ tabs, tableData, activeTab, onTabChange, setSelectedRow, onClickNext, onClickPrev, loading }: any) => {
    // const [activeTab, setActiveTab] = useState(tabs[0]?.id);
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>();

    // useEffect(() => {
    //     onTabChange(tabs[0]?.id)
    // }, [...tabs.map((tab: any)=>tab.id)]);

    useEffect(() => {
        setSelectedRowIndex(null);
        setSelectedRow && setSelectedRow(null);
    }, [activeTab])

    const handleTabClick = (tabId: string) => {
        onTabChange(tabId);
    };

    const onRowClick = (rowValues: any, index: number) => {
        setSelectedRow(rowValues);
        setSelectedRowIndex(index);
    };

    const onNextClick = () => {
        onClickNext();
        setSelectedRowIndex(null);
        setSelectedRow(null);
    }

    const onPrevClick = () => {
        onClickPrev();
        setSelectedRowIndex(null);
        setSelectedRow(null);
    }

    return (
        <div className="flex flex-col items-start gap-0 relative">
            {/* Tabs */}
            <div className="flex">
                {tabs.map((tab: { id: string, label: string }, index: number) => (
                    <button
                        key={tab.id}
                        className={`text-center whitespace-nowrap font-lato text-base leading-[19.2px] px-5 py-[15px] border-y-[0.5px] border-r-[0.5px] border-[#BDBDBD] font-normal ${activeTab === tab.id ? 'bg-darkgreen text-white font-bold ' : 'bg-skyGray text-gray-700'
                            } ${tabs.length - 1 === index ? 'rounded-tr-2xl' : ""} ${index === 0 ? 'rounded-tl-2xl border-l-[0.5px]' : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            {loading && <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center"><ScaleLoader color="#335908" /></div>}
            <><table className="w-full rounded-b-2xl rounded-tr-2xl border-separate overflow-hidden border-spacing-0">
                {/* Table Header */}
                <thead className="bg-[#E0F5B1] font-plusJakartaSans font-bold text-base">
                    <tr className=''>
                        {
                            tableData[activeTab]?.headers?.map((header: string, index: any) => <th className={`py-[14px] border-[0.5px] border-tableBorder px-5 leading-[22px] ${tableData[activeTab].headers.length - 1 === index && 'rounded-tr-2xl'}`}>{header}</th>)
                        }
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {tableData[activeTab]?.values?.map((rowValues: Array<any>, index: number) => (
                        <tr onClick={() => onRowClick(rowValues, index)} key={index} className={`font-lato font-medium text-base leading-[22px] text-black text-center ${selectedRowIndex === index && 'bg-dullGreen'} ${index % 2 === 1 && selectedRowIndex !== index ? 'bg-fadeTableGray' : ''} cursor-pointer hover:bg-dullGreen`}>
                            {rowValues.map((value: any, valueIndex) => <td className={`border-b-[0.5px] border-r-[0.5px] py-[14px] ${valueIndex === 0 && 'border-l-[0.5px]'}  border-tableBorder leading-[22px] px-5 ${tableData[activeTab]?.values.length === (index + 1) && valueIndex === 0 ? 'rounded-bl-2xl' : ''}  ${tableData[activeTab].values.length === (index + 1) && rowValues.length - 1 === valueIndex ? 'rounded-br-2xl' : ''}

                            `}>{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
                <div className='flex justify-end w-full gap-3 pt-3'>
                    <div className='cursor-pointer' onClick={onPrevClick}><LeftPaginationIcon /></div>
                    {tableData[activeTab]?.page}-{Math.ceil(tableData[activeTab]?.totalCount / tableData[activeTab]?.limit)}
                    <div className='cursor-pointer' onClick={onNextClick}>
                        <RightPaginationIcon />
                    </div>

                </div>
            </>
        </div>
    );
};

export default React.memo(TableComponent);
