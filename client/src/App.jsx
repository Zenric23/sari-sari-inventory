import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import NavigationBar from "./components/NavigationBar";
import ProdMaster from "./components/ProdMaster";
import Transaction from "./components/Transaction";



function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <NavigationBar />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/product-master',
            element: <ProdMaster />
          },
          {
            path: '/transaction',
            element: <Transaction />
          },
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
