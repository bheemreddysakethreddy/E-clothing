import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart";
import Kid from "./pages/Kid";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Trending from "./pages/Trending";
import Productdetails from "./pages/Productdetails";
import Protected from "./utils/protected";
import Login from "./components/login";
import { productsFetch } from "./redux/thunks/productTunk";
import { cartProducts } from "./redux/thunks/cartTunk";
import { store } from "./redux/store";
import Order from "./pages/Order";

async function getMensProducts() {
  await store.dispatch(
    productsFetch("http://localhost:8000/products/?category=men"),
  );
  return null;
}
async function getWomensProducts() {
  await store.dispatch(
    productsFetch("http://localhost:8000/products/?category=women"),
  );
  return null;
}
async function getCartProducts() {
  const user = JSON.parse(localStorage.getItem("user"));
  await store.dispatch(cartProducts(`http://localhost:8000/cart/${user._id}`));
  return null;
}
async function getKidsProducts() {
  await store.dispatch(
    productsFetch("http://localhost:8000/products/?category=kid"),
  );
  return null;
}
async function getTrendingProducts() {
  await store.dispatch(
    productsFetch("http://localhost:8000/products/?trending=true"),
  );
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart />, loader: getCartProducts },
      { path: "/kid", element: <Kid />, loader: getKidsProducts },
      { path: "/men", element: <Men />, loader: getMensProducts },
      { path: "/women", element: <Women />, loader: getWomensProducts },
      { path: "/trending", element: <Trending />, loader: getTrendingProducts },
      { path: "/productdetail", element: <Productdetails /> },
      { path: "/order", element: <Order />, loader: getCartProducts },
    ],
  },
]);

export default function App() {
  console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
    </>
  );
}

// export default function App() {

//     return <>

//         {/* <BrowserRouter>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route element={<ProtectedRoutes />}>

//                     {/* <Route path="/" element={<Navbar  />} /> */}
//                     <Route path="/" element={<Home />} />
//                     <Route path="/cart" element={<Cart />} />
//                     <Route path="/kid" element={<Kid />} />
//                     <Route path="/men" element={<Men />} />
//                     <Route path="/women" element={<Women />} />
//                     <Route path="/trending" element={<Trending />} />
//                     <Route path="/productdetail" element={<Productdetails />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter> */}
//     </>
// }
