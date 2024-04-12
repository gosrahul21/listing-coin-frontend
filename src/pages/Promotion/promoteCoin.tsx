import { useEffect } from "react";
import Layout from "../../shared/Layout";


const PromoteCoinsPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-8">Advertise with Us</h1>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Promote your coins here.</h2>
          <p className="mb-4">Or contact telegram @ourtelegramId to promote your coins</p>
          <p className="mb-4">Only trust the above email when discussing promotions on our platform.</p>
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold mb-4">Discount:</h3>
            <ul>
              <li className="mb-2">3 days (20%)</li>
              <li className="mb-2">5 days (30%)</li>
              <li className="mb-2">10 days (40%)</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PromoteCoinsPage;
