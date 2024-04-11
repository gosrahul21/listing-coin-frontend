import Login from "../pages/Login/Login";
import TokenDetailPage from "../pages/Token/TokenDetail";
import AddToken from "../pages/Token/AddToken";
import User from "../pages/Dashboard";
import PromoteCoinsPage from "../pages/Promotion/promoteCoin";

export interface Route {
    exact: boolean;
    path: string;
    component: JSX.Element;
}

const landingRoutes: Route[] = [
    {
        path: '/dashboard',
        exact: true,
        component: <User />
    },
    {
        path: '/dashboard/user',
        exact: true,
        component: <User />
    },
    {
        path: '/token/add',
        exact: true,
        component: <AddToken />
    },
    {
        path: '/token/:tokenId',
        exact: true,
        component: <TokenDetailPage/>,
    },
    {
        path: '/promote',
        exact: true,
        component: <PromoteCoinsPage/>,
    }
]

const userRoutes: Route[] = [

]

const guestRoutes: Route[] = [
    {
        path: '/',
        exact: true,
        component: <Login type='login' />
    },
    {
        path: '/login',
        exact: true,
        component: <Login type='login' />
    },
    {
        path: '/register',
        exact: true,
        component: <Login type='register' />
    }
];

export { landingRoutes, guestRoutes, userRoutes }

