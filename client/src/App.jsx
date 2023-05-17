import {
  Router,
  Routes,
  Outlet,
  Navigate,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NavigationBar from "./components/NavigationBar";
import ProdMaster from "./components/ProdMaster";
import Transaction from "./components/Transaction";
import { useContext } from "react";
import { UserContext } from "./context/userContext";



function App() {

  const { userDetails} = useContext(UserContext)

  const PrivateRoutes = () => {
    return (
      userDetails ? <Outlet /> : <Navigate to="/login" />
    )
  }

  // const router = createBrowserRouter(
  //   [
  //     {
  //       path: '/',
  //       element: <NavigationBar />,
  //       children: [
  //         {
  //           path: '/',
  //           element: <Home />
  //         },
  //         {
  //           path: '/product-master',
  //           element: <ProdMaster />
  //         },
  //         {
  //           path: '/transaction',
  //           element: <Transaction />
  //         },
  //       ]
  //     },
  //     {
  //       path: '/login',
  //       element: <Login />
  //     },
  //     {
  //       path: '/register',
  //       element: <Register />
  //     },
  //   ]
  // );

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route element={<NavigationBar />}>
              <Route path="/" element={<Home />} />
              <Route path="/product-master" element={<ProdMaster />} />
              <Route path="/transaction" element={<Transaction />} />
            </Route>
        </Route>
        <Route path="/login" element={!userDetails && <Login />} />
        <Route path="/register" element={!userDetails && <Register />} />
      </Routes>
    </>
  )
}

export default App
