import RoleDropdown from "./RoleDropdown";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { UserType } from "../types/enums/userType";
import { useEffect } from "react";
import Button from "../widgets/Button";
import FeatureNav from "./FeatureNav";
import primaryLogo from '../assets/images/primary-logo.png'

const Header = () => {
    const navigate = useNavigate();
    // const location = useLocation()
    const { user, changeRole, selectedRole } = useUserContext();

    useEffect(() => {
        if (selectedRole) {
            if (selectedRole === 'logout') {
                return navigate("/login");
            }
        }
    }, [selectedRole]);

    return (<div className="flex h-fit lg:h-[99px] bg-slate-800 z-10 items-center gap-2 lg:gap-6 pr-4 px-2 py-2 md:px-5 sticky top-0 ">
        <div className="flex-1">
            <img onClick={() => navigate('/dashboard')} src={primaryLogo} className="w-[40px] h-[40px] lg:w-[97px] lg:h-[83px] object-fill cursor-pointer" alt='coin100x' />
        </div>
        <form id="searchForm" className=" focus:ring-gray-400 hidden md:flex bg-slate-700 rounded-2xl w-1/5">
            <button type="submit" className="flex items-center py-2 px-4 bg-transparent text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2M15 9a6 6 0 11-12 0 6 6 0 0112 0z"></path>
                </svg>
            </button>
            <input type="text" id="searchInput" placeholder="Search token..." className="py-2 px-4 text-gray-200 rounded-r-2xl outline-none  bg-slate-700" />
        </form>

        <Button className="hidden lg:block" name="ADD your coin" onClick={() => { navigate('/token/add') }} variant="primary" />
        <RoleDropdown value={{ user: user, selectedRole: selectedRole! }} onSelect={(role: UserType) => { changeRole(role) }} items={["My Coins", "Orders", "My Profile", "Settings", "Logout"]} />
        <FeatureNav />
    </div>)
}

export default Header;