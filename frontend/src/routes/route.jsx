import { createBrowserRouter,createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Search from "../pages/Search/search";
import Details from "../pages/Details/details";
import Verify from "../pages/Verify/Verify";
import PaymentPreview from "../pages/Payment/PaymentPreview";
import MyOrders from "../pages/MyOrders/MyOrders";
import Admin from "../pages/Admin/Admin";
import AddProduct from "../pages/AddProduct/AddProduct";
import ListProduct from "../pages/ListProduct/ListProduct";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile"
const url = "https://food-bite-api.vercel.app";
//const url="http://localhost:4000";
const router=createHashRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {path:'cart', element:<Cart />},
            {path:'order',element:<PlaceOrder/>},
            {path:'search',element:<Search/>},
            {path:'gadget/:id',element:<Details/>},
            {path:'verify',element:<Verify/>},
            {path:'profilePage',element:<Profile/>},
            {path:'payment/:orderId',element:<PaymentPreview/>},
            {path:'myorders',element:<MyOrders/>},
            {
                path:'admin',element:<Admin/>,
                children:[
                    {path:'add',element:<AddProduct url={url}/>},
                    {path:'list',element:<ListProduct url={url}/>},
                    {path:'orders',element:<Orders url={url}/>}

                ]
            }

        ]
    }
])
export default router