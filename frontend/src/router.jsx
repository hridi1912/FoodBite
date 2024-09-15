import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Search from "./pages/Search/search";
import Profile from "./pages/Profile/Profile";
import Details from "./pages/Details/details";
import Verify from "./pages/Verify/Verify";
import PaymentPreview from "./pages/Payment/PaymentPreview";
import MyOrders from "./pages/MyOrders/MyOrders";
import Admin from "./pages/Admin/Admin";
import AddProduct from "./pages/AddProduct/AddProduct";
import ListProduct from "./pages/ListProduct/ListProduct";
import Orders from "./pages/Orders/Orders";
import Footer from "./components/Footer/Footer";

  //const url = "https://food-bite-api.vercel.app";
  const url="http://localhost:4000";
  export const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<App/>}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profilePage' element={<Profile />} />
          <Route path="/gadget/:id" element={<Details />} />
          <Route path='/verify' element={<Verify />} />
          <Route path="/payment/:orderId" element={<PaymentPreview />} />
          <Route path='/myorders' element={<MyOrders />} />
          
          {/* Nested routes under /admin */}
         
          <Route path='/admin' element={<Admin />}>
            <Route path='add' element={<AddProduct url={url} />} />
            <Route path='list' element={<ListProduct url={url} />} />
            <Route path='orders' element={<Orders url={url} />} />
          </Route>
          <Route>
             <Route path='/' element={<Footer />} />
          </Route>

        </Route>
  )) 