import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTokenById } from '../../services/tokenService';
import WebsiteIcon from '../../assets/icons/WebsiteIcon';
import InstagramIcon from '../../assets/icons/InstagramIcon';
import TelegramIcon from '../../assets/icons/TelegramIcon';
import Layout from '../../shared/Layout';
import Chart from '../../components/Chart';
import { FaCopy } from "react-icons/fa";
import copyToClipboard from '../../utils/copyToClipboard';
import { toast } from 'react-toastify';

const TokenDetailPage = () => {
    const { tokenId } = useParams();
    const [token, setToken] = useState<any>(null);

    useEffect(() => {
        if (!tokenId)
            return;
        fetchTokenDetails(tokenId);
    }, [tokenId]);

    const fetchTokenDetails = async (tokenId: string) => {
        try {
            const { status, data } = await getTokenById(tokenId);
            if (!status)
                return;
            setToken(data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="text-gray-100 px-10 py-4">
                <div className="mb-4 ">
                    <div className="flex items-center mb-6 gap-2 py-2">
                        <img src={token?.logoUrl} alt={`${token?.name} Logo`} className="w-12 h-12 mr-4" />
                        <div>
                            <h1 className="text-3xl font-bold">{token?.name} ({token?.symbol})</h1>
                        </div>
                        <div className='flex gap-2 items-center text-gray-300'>
                            <p>{token?.tokenAddress}</p>
                            <FaCopy onClick={() => copyToClipboard(token?.tokenAddress, () => {
                                toast("wallet address copied to clipboard.", {
                                    type: "success",
                                });
                            },
                                () => {
                                    toast("wallet address copying to clipboard failed.", {
                                        type: "error",
                                    });
                                }
                            )} className='cursor-pointer text-white' />
                        </div>
                    </div>
                </div>

                <div className="mb-4 ">
                    <div className="flex gap-2 items-center">
                        <div className="cursor-pointer">
                            <WebsiteIcon />
                        </div>
                        <div className="cursor-pointer">
                            <InstagramIcon />
                        </div>
                        <div className="cursor-pointer">
                            <TelegramIcon />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-100 my-4">
                    <div>
                        <div className="bg-slate-700 shadow-md rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold mb-2">Price & Market</h2>
                            <p>Current Price: {token?.currentPrice}</p>
                            <p>Market Cap: ${token?.marketCap}</p>
                            {/* <p>Trading Volume 24h: {token?.tradingVolume24h}</p> */}
                        </div>
                    </div>

                    <div>
                        <div className="bg-slate-700 shadow-md rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold mb-2">Token Details</h2>
                            <p>Algorithm: {token?.algorithm}</p>
                            <p>Consensus Mechanism: {token?.consensusMechanism}</p>
                            <p>Max Supply: {token?.maxSupply}</p>
                            <p>Circulating Supply: {token?.circulatingSupply}</p>
                            <p>Total Supply: {token?.totalSupply}</p>
                            <p>Token Type: {token?.tokenType}</p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-slate-700 shadow-md rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold mb-2">Links & Resources</h2>
                            <p>GitHub Repo: <a href={token?.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-500">{token?.githubRepo}</a></p>
                            <p>Whitepaper: <a href={token?.whitepaperUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{token?.whitepaperUrl}</a></p>
                            <p>Roadmap: <a href={token?.roadmap} target="_blank" rel="noopener noreferrer" className="text-blue-500">{token?.roadmap}</a></p>
                        </div>
                    </div>
                </div>
                <Chart tokenId={tokenId!} />

                <div className='py-2 mt-4'>
                    <p className=" text-gray-100">{token?.description}</p>
                </div>
            </div>
        </Layout>
    );

};

export default TokenDetailPage;
