import Header from "../components/Header";
import primaryLogo from '../assets/images/primary-logo.png'
export default function Layout({ children }: any) {
  return <div className="flex flex-col bg-slate-900">
    <Header />
    {children}
    <footer className="bg-gray-800 px-4 text-white py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between px-4 gap-10">
        <div className="flex-1">
          <img src={primaryLogo} alt="Logo" className="h-12 mb-4 bg-none" />
          <p className="text-sm w-3/4">The best cryptocurrency token voting service to find new gem coins. Research over 90,000 coins verified with honeypot, rug pull and all market data including token prices, market cap, liquidity and holder data. Find out popular presale & fair launch tokens. Explore, buy and earn. CoinsGem - Find your 100x gem!</p>
        </div>

        <div className="">
          <h2 className="text-lg font-bold mb-4">Social Links</h2>
          <ul className="text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Telegram</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Debank</a></li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-lg font-bold mb-4">Coin Resources</h2>
          <ul className="text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">Coin ranking</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Daily Top coins</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Submit Coin</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Airdrops</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">All AirDrops</a></li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-lg font-bold mb-4">Advertise</h2>
          <ul className="text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">Promote coin</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Banners</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Services & prices</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-xs">&copy; 2021-2024 © CoinsGEM - Best New Crypto Tokens & Coins</p>
      </div>
    </footer>
  </div>
}