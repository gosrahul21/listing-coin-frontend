import { useEffect, useState } from 'react';
import Layout from '../../shared/Layout';
import { FiUpload } from "react-icons/fi";
import { listChain } from '../../services/chainService';
import CancelIcon from '../../assets/icons/CancelIcon';
import { addToken } from '../../services/tokenService';
import { toast } from 'react-toastify';
import { enqueueSnackbar } from 'notistack';
import { uploadFile } from '../../services/uploadService';
import { instance1 } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


const AddToken = () => {

    const initialFormData = {
        name: '',
        symbol: '',
        chainId: '',
        tokenAddress: '',
        description: '',
        website: '',
        instagram: '',
        telegram: '',
        logoUrl: '',
        // currentPrice: 0,
        marketCap: 0,
        // tradingVolume24h: 0,
        // algorithm: '',
        // consensusMechanism: '',
        maxSupply: 0,
        launchDate: '',
        githubRepo: '',
        communityChannels: [],
        roadmap: '',
        // allTimeHigh: 0,
        // allTimeLow: 0,
        // priceChange24h: 0,
        // exchanges: [],
        // tradingPairs: [],
        circulatingSupply: 0,
        totalSupply: 0,
        tokenType: '',
        whitepaperUrl: ''
    };


    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const [chains, setChains] = useState<any>([]);

    useEffect(() => {
        fetchChains()
    }, []);

    const fetchChains = async () => {
        const { status, data } = await listChain({});
        if (!status)
            return;
        setChains(data?.chains);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateFormData(formData)) return;
        try {
            // Handle form submission
            // add validation
            const toastInstance = toast.loading("Adding product", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
            const { status, data } = await addToken(formData);
            toast.dismiss(toastInstance)
            if (status) {
                enqueueSnackbar("token added successfully", { variant: 'success' })
                navigate('/dashboard');
            } else
                throw new Error(data);
        } catch (error) {
            enqueueSnackbar("token add failed", { variant: 'error' })
        }
    };

    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         setFormData((prevData: any) => ({
        //             ...prevData,
        //             logoUrl: e?.target?.result,
        //         }));
        //     };
        //     reader.readAsDataURL(file);
        // }
        const response = await uploadFile(file);
        if (response.status) {
            setFormData((prevData: any) => ({
                ...prevData,
                logoUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/public/${response.data.name}`,
            }));
            enqueueSnackbar("logo uploaded")
        }
    };

    const validateFormData = (formData: any) => {
        const { name, symbol, chainId, tokenAddress, marketCap, maxSupply, launchDate, website, telegram, whitepaperUrl, description } = formData;

        if (!name) {
            enqueueSnackbar("Please enter the token name", { variant: "error" });
            return false;
        }

        if (!symbol) {
            enqueueSnackbar("Please enter the token symbol", { variant: "error" });
            return false;
        }

        if (!chainId) {
            enqueueSnackbar("Please select a chain", { variant: "error" });
            return false;
        }

        if (!tokenAddress) {
            enqueueSnackbar("Please enter the token Address", { variant: "error" });
            return false;
        }

        if (!marketCap) {
            enqueueSnackbar("Please enter the market cap", { variant: "error" });
            return false;
        }

        if (!maxSupply) {
            enqueueSnackbar("Please enter the maximum supply", { variant: "error" });
            return false;
        }

        if (!launchDate) {
            enqueueSnackbar("Please select a launch date", { variant: "error" });
            return false;
        }

        if (!website) {
            enqueueSnackbar("Please enter the website URL", { variant: "error" });
            return false;
        }

        if (!telegram) {
            enqueueSnackbar("Please enter the Telegram URL", { variant: "error" });
            return false;
        }

        if (!whitepaperUrl) {
            enqueueSnackbar("Please enter the whitepaper URL", { variant: "error" });
            return false;
        }

        if (!description) {
            enqueueSnackbar("Please enter a description", { variant: "error" });
            return false;
        }

        return true;
    };


    const cancelImageUpload = () => {
        console.log(formData.logoUrl)
        setFormData((prevData) => ({ ...prevData, logoUrl: "" }))
    }

    return (<Layout>
        <div className="flex justify-center gap-8 py-4">
            <div>
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Add Token</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-gray-100">NAME</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300 bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">SYMBOL</label>
                    <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        className="w-full outline-none border-none  bg-slate-700 text-gray-100 border-gray-300 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">CHAIN</label>
                    <select className="block mb-2 text-gray-100 bg-slate-700 w-full px-2 py-2 rounded-md outline-none" onChange={handleChange} name="chainId" id="chains">
                        <option>SELECT CHAIN</option>
                        {
                            chains?.map((chain: any) => <option value={chain._id}>{chain.name}</option>)
                        }
                    </select>

                    <label className="block mb-2 text-gray-100">TOKEN ADDRESS</label>
                    <input
                        type="text"
                        name="tokenAddress"
                        value={formData.tokenAddress}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Market Cap</label>
                    <input
                        type="text"
                        name="marketCap"
                        value={formData.marketCap}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Circulating Supply</label>
                    <input
                        type="text"
                        name="maxSupply"
                        value={formData.maxSupply}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Launch Date</label>
                    <input
                        type="date"
                        name="launchDate"
                        value={formData.launchDate}
                        onChange={handleChange}
                        className="w-full outline-none border-none  bg-slate-700 text-gray-100 border-gray-300 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Website</label>
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Telegram</label>
                    <input
                        type="text"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                    />



                    <label className="block mb-2 text-gray-100">Whitepaper Url</label>
                    <input
                        type="text"
                        name="whitepaperUrl"
                        value={formData.whitepaperUrl}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 text-gray-100">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full outline-none border-none border-gray-300  bg-slate-700 text-gray-100 rounded-md p-2 mb-4"
                        required
                    />

                    {/* Add other required fields here */}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-yellow-600"
                    >
                        Add Token
                    </button>
                </form>
            </div>
            <div className="mb-4">
                <label className="block pb-4  text-gray-100 text-center text-xl font-normal">Logo</label>
                <div className="relative border border-gray-300 h-[200px] w-[200px] rounded-md p-2">
                    {formData.logoUrl && <div onClick={cancelImageUpload} className='absolute top-0 right-0 bg-white rounded-full max-w-fit p-1 cursor-pointer'>
                        <CancelIcon />
                    </div>}

                    {formData.logoUrl ? (
                        <img src={formData.logoUrl} alt="Uploaded Logo" className="w-full outline-none border-none object-contain" />
                    ) : (
                        <div className="flex justify-center items-center h-40">
                            <input
                                type="file"
                                id="logoUrl"
                                name="logoUrl"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label htmlFor="logoUrl" className="cursor-pointer">
                                <FiUpload className="text-white" size={40} />
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </Layout>
    );
};

export default AddToken;
