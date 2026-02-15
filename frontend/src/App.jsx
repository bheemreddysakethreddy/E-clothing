import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Kid from "./pages/Kid";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Trending from "./pages/Trending";
import Productdetails from "./pages/Productdetails";
import Protected from "./utils/protected";
import Login from "./components/login";
import Order from "./pages/Order";
import MainLayout from "./utils/MainLayout";

// async function getMensProducts() {
//   await store.dispatch(
//     productsFetch("http://localhost:8000/products/?category=men&&skip=0&&limit=3"),
//   );
//   return null;
// }
// async function getWomensProducts() {
//   await store.dispatch(
//     productsFetch("http://localhost:8000/products/?category=women"),
//   );
//   return null;
// }
// async function getCartProducts() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   if (!user || !token) {
//     return null;
//   }

//   await store.dispatch(cartProducts(`http://localhost:8000/cart/${user.id}`));

//   return null;
// }
// async function getKidsProducts() {
//   await store.dispatch(
//     productsFetch("http://localhost:8000/products/?category=kid"),
//   );
//   return null;
// }
// async function getTrendingProducts() {
//   await store.dispatch(
//     productsFetch("http://localhost:8000/products/?trending=true"),
//   );
//   return null;
// }

// const router = createBrowserRouter([
//   {
//     element: <MainLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/men", element: <Men />, loader: getMensProducts },
//       { path: "/women", element: <Women />, loader: getWomensProducts },
//       { path: "/kid", element: <Kid />, loader: getKidsProducts },
//       { path: "/trending", element: <Trending />, loader: getTrendingProducts },
//       { path: "/productdetail/:productId", element: <Productdetails /> },

//       {
//         element: <Protected />,
//         children: [
//           { path: "/cart", element: <Cart />, loader: getCartProducts },
//           { path: "/order", element: <Order />, loader: getCartProducts },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

// export default function App() {
//   console.log(JSON.parse(localStorage.getItem("user")));
//   return (
//     <>
//       <RouterProvider router={router}> </RouterProvider>
//     </>
//   );
// }

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/kid" element={<Kid />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/trending" element={<Trending />} />
            <Route
              path="/productdetail/:productId"
              element={<Productdetails />}
            />
            <Route element={<Protected />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
