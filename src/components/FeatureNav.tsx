import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FeatureNav() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef: any = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            {/* Icon to toggle modal */}
            <div className="p-2 rounded-md cursor-pointer bg-slate-500" onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" style={{ "fill": "#FFFFFF" }}>
                    <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
                </svg>
            </div>
            {/* Modal */}
            {isOpen && (
                <div className="fixed top-0 left-0 pt-4 inset-0 z-50 flex justify-end " >
                    <div className="relative w-80 shadow-lg rounded-md bg-slate-900 pt-3" ref={modalRef}>
                        {/* Close button */}
                        <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal content */}
                        <div className="p-2 flex flex-col text-sm gap-1 overflow-auto">
                            {/* Add your modal content here */}
                            <div className=' py-1 px-4  rounded-md text-gray-400'>
                                Cryptocurrencies
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Recently Added
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                1H Gainers
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                24h Gainers
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                By Market Cap
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Daily Top
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Presales
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                New Born Tokens
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Presales
                            </div>
                            <div className=' py-1 px-4 mt-2 rounded-md text-gray-400'>
                                Networks
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Binance Smart Chain
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Ethereum
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Solana
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Arbitrum
                            </div>

                            <div className=' py-1 px-4 mt-2 rounded-md text-gray-400'>
                                Others
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Airdrop
                            </div>


                            <div className=' py-1 px-4 mt-2 rounded-md text-gray-400'>
                                Advertisment
                            </div>

                            <div className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Promote your coin
                            </div>

                            <div onClick={()=>navigate('/token/add')} className='hover:bg-slate-800 py-1 px-4 cursor-pointer rounded-md text-gray-100'>
                                Add your coin
                            </div>

                            {/* <div className='flex justify-center w-full'>
                                <div>
                                    <a href="//www.dmca.com/Protection/Status.aspx?ID=f3b8cd06-6829-45b3-8a36-8f3a4fc991d7" title="DMCA.com Protection Status" className="dmca-badge"> <img src="https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=f3b8cd06-6829-45b3-8a36-8f3a4fc991d7" alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>

                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeatureNav;
