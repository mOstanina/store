import {
    ADMIN_PANEL_ROUTE,
    AUTHORIZATION_ROUTE,
    PRODUCT_ROUTE,
    ONLINE_STORE_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/constants";
import AdminPanel from "./pages/AdminPanel";
import OnlineStore from "./pages/OnlineStore";
import Authorization from "./pages/Authorization";
import Product from "./pages/Product";

export const privateRoutes = [
    {
        path: ADMIN_PANEL_ROUTE,
        Component: <AdminPanel />
    },
]

export const publicRoutes = [
    {
        path: ONLINE_STORE_ROUTE,
        Component: <OnlineStore />
    },
    {
        path: AUTHORIZATION_ROUTE,
        Component: <Authorization />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Authorization />
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: <Product />
    },
]