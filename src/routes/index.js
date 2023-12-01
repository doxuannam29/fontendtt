import HomePage from "../page/HomePage/HomePage";
import NotPage from "../page/NotPage/NotPage";
import OderPage from "../page/OderPage/OderPage";
import ProductsPage from "../page/ProductsPage/ProductsPage";
import Singin from "../page/Singin/Singin";
import Singup from "../page/Singup/Singup";
import Typepage from "../page/TypePage/Typepage";
import ProfliePage from "../page/Profile/ProfilePage";
import AdminPage from "../page/AdminPage/AdminPage";
import SanrPham from "../page/SanPham/SanPham";
import SanPhamUser from "../page/SanPhamUser/SanPhamUser";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/oder',
        page: OderPage,
        isShowHeader: true
    },
    {
        path: '/products/:id',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/type',
        page: Typepage,
        isShowHeader: true
    },
    {
        path: '/sanpham',
        page: SanrPham,
        isShowHeader: true
    },
    {
        path: '/sanphamuer',
        page: SanPhamUser,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Singup,
        isShowHeader: false
    },
    {
        path: '/singin',
        page: Singin,
        isShowHeader: false
    },
    {
        path: '/profile',
        page: ProfliePage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true
    },
    {
        path: '*',
        page: NotPage
    },
]