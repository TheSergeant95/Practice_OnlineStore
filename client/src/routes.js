import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Context } from "./index.js"
import Admin from "./pages/admin.js"
import Auth from "./pages/auth.js"
import Cart from "./pages/cart.js"
import ItemPage from "./pages/itemPage.js"
import Shop from "./pages/shop.js"
import { ADMIN_ROUTE, CART_ROUTE, ITEM_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE } from "./utils/consts.js"

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: <Admin/>
	},
	{
		path: CART_ROUTE,
		Component: <Cart/>
	}
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: <Shop/>
	},
	{
		path: LOGIN_ROUTE,
		Component: <Auth/>
	},
	{
		path: REGISTER_ROUTE,
		Component: <Auth/>
	},
	{
		path: ITEM_ROUTE + '/:id',
		Component: <ItemPage/>
	},
]

export const ProtectedRoute = ({ children }) => {
	const {user} = useContext(Context)
	if (!user.isAuth) {
	  // user is not authenticated
	  return <Navigate to="/" />;
	}
	return children;
  };
  