/* eslint-disable */
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import * as React from "react";
import Button from "../widgets/Button";
import Layout from "../shared/Layout";
import { getTokenPriceById, listToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";

const CustomTable = React.lazy(() => import("../widgets/CustomTable"));

const User = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading] = useState(false);
  const [statusLoading,] = useState(false);
  const tokenRef = React.useRef(tokens);
  const navigate = useNavigate()

  useEffect(() => {
    tokenRef.current = tokens;
  });

  useEffect(() => {
    fetchTokenList()
  }, []);

  const fetchTokenList = async () => {
    const { status, data } = await listToken({});
    if (status && data) {
      fetchTokenPrice(data);
    }
  }

  useEffect(() => {
    setInterval(() => {
      fetchTokenPrice();
    }, 5000)
  }, [])

  const fetchTokenPrice = async (tokensData?: any) => {
    const tokensListData = tokensData || tokenRef.current;
    const tokensWithPrice = await Promise.all(tokensListData.map(async (token: any) => {
      const { status, data } = await getTokenPriceById(token._id);
      if (status)
        return { ...token, ...data };
      else return token;
    }));
    setTokens(tokensWithPrice)
    return tokensWithPrice;
  }


  const tableData: any = {
    tokens: {
      headers: ["name", "chain", "1h%", "24h%", "Market Cap", "volume", "Launch", "Votes"],
      // name chain 1h% 24h% marketcap volume Launch Votes
      values: tokens?.map((coin: any) => [
        <div className="flex items-center gap-4"><img className="h-16 rounded-full" src={coin.logoUrl ? coin.logoUrl : "https://cdn.coinsgem.com/coins/100x100/0xc93B7e6d6445f8e7de92abDDbFBC8057CdCaA1a6.png"} />{coin.name}</div>,
        coin.chainId.name,
        <div className={`${coin.oneHrChange < 0 ? "text-red-400" : "text-green-400"}`}>
          {coin.oneHrChange ? `${coin.oneHrChange.toFixed(2)}%` : ''}
        </div>
        ,
        <div className={`${coin.oneDayChange < 0 ? "text-red-400" : "text-green-400"}`}>
          {coin.oneDayChange ? `${coin.oneDayChange.toFixed(2)}%` : ''}
        </div>,
        coin.marketCap,
        coin.volume,
        coin.launchDate ? new Date(coin.launchDate).toLocaleDateString() : 'NA',
        <div className=" flex items-center gap-4 justify-center">{coin.votes}<Button name="Vote" variant="secondary" onClick={(e: any) => { e.stopPropagation() }} /></div>,
        coin._id,
      ]),
      // limit: userListData.limit,
      // page: userListData.page,
      // totalCount: userListData?.totalCount,
    },
  };



  return (<Layout>
    <div className="flex flex-col gap-8 py-8 px-40 basis-0 flex-grow flex-shrink-0">
      <div className="grid grid-cols-4   rounded-2xl  shadow-sm">
        {[1, 2, 3, 4].map(() => <div className="h-full rounded-md m-2">
          <img className="h-full rounded-xl" src="https://coinsgem.com/_next/image?url=https%3A%2F%2Fcdn.coinsgem.com%2Fbanners%2Ff4fb5e3d40-ezgif-2-ea746f8d8c.gif&w=768&q=75" />
        </div>)}
      </div>

      <div className="flex flex-col border border-yellow-400 rounded-xl bg basis-0">
        <img className="object-contain w-full h-full shadow rounded-xl" src="https://coinsgem.com/_next/image?url=https%3A%2F%2Fcdn.coinsgem.com%2Fbanners%2F1216f7cc5d4-2.gif&w=1024&q=75" />
      </div>

      {/* Promote coin Table */}
      <div className="flex flex-col items-start gap-3 relative">
        {/* Tabs */}
        {/* <Tabs activeTab={activeTab} onTabChange={onTabChange} tabs={tabs} /> */}
        <div className="flex justify-between w-full">
          <h3 className="text-yellow-400 text-2xl font-semibold leading-1">
            Promoted Spot
          </h3>
          <Button name="promote your coin" onClick={() => { navigate("/promote") }} variant="primary" />
        </div>

        {/* Table */}
        {loading && (
          <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center">
            <ScaleLoader color="#335908" />
          </div>
        )}
        <CustomTable
          headers={tableData.tokens.headers}
          values={tableData.tokens.values}
          onItemClick={(itemId) => navigate('/token/' + itemId)}
          page={1}
          limit={10}
          totalCount={10}
          onClickNext={() => { }}
          onClickPrev={() => { }}
        />
      </div>
      {statusLoading && <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center"><ScaleLoader color="#335908" /></div>}

      <div className="flex flex-col border border-yellow-400 rounded-xl bg basis-0">
        <img className="object-contain w-full h-full shadow rounded-xl" src="https://coinsgem.com/_next/image?url=https%3A%2F%2Fcdn.coinsgem.com%2Fbanners%2F1216f7cc5d4-2.gif&w=1024&q=75" />
      </div>

      <div className="flex flex-col items-start gap-2 relative">
        {/* Tabs */}
        {/* <Tabs activeTab={activeTab} onTabChange={onTabChange} tabs={tabs} /> */}

        {/* Table */}
        <div className="flex justify-between w-full">
          <h3 className="text-yellow-400 text-2xl font-semibold leading-1">
            All Time Top
          </h3>
          <Button name="add your coin" onClick={() => { navigate('/token/add')}} variant="primary" />
        </div>

        {loading && (
          <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center">
            <ScaleLoader color="#335908" />
          </div>
        )}
        <CustomTable
          headers={tableData.tokens.headers}
          values={tableData.tokens.values}
          onItemClick={(itemId) => navigate('/token/' + itemId)}
          page={1}
          limit={10}
          totalCount={10}
          onClickNext={() => { }}
          onClickPrev={() => { }}
        />
      </div>

      <div className="flex flex-col border border-yellow-400 rounded-xl bg basis-0">
        <img className="object-contain w-full h-full shadow rounded-xl" src="https://coinsgem.com/_next/image?url=https%3A%2F%2Fcdn.coinsgem.com%2Fbanners%2F1216f7cc5d4-2.gif&w=1024&q=75" />
      </div>
    </div>
  </Layout >
  );
};


export default User;
