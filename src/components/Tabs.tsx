export default function Tabs(props: {
    tabs: {
        id: string,
        label: string
    }[
    ],
    onTabChange: (id: string) => void;
    activeTab: string;
}) {
    const handleTabClick = (tabId: string) => {
        onTabChange(tabId);
    };

    const { tabs, onTabChange, activeTab } = props;
    return (<div className="flex">
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
    </div>)
}