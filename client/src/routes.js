import { ADMIN_ROUTE, AUTH_ROUTE, BASCKET_ROUTE, CATALOG_ROUTE, ITEMPAGE_ROUTE, REGISTRATION_ROUTE, USER_ROUTE, MAIN_ROUTE, GARANT_ROUTE, DELIVERY_ROUTE } from "./utils/consts"
import Admin from "./pages/Admin"
import Bascket from "./pages/Bascket"
import User from "./pages/User"
import Catalog from "./pages/Catalog"
import ItemPage from "./pages/ItemPage"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Garant from "./pages/Garant"
import Delivery from "./pages/Delivery"


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASCKET_ROUTE,
        Component: Bascket
    },
    {
        path: USER_ROUTE,
        Component: User
    }
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: ITEMPAGE_ROUTE + '/:id',
        Component: ItemPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Home
    },
    {
        path: GARANT_ROUTE,
        Component: Garant
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
]