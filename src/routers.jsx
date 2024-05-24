import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Public, Personal } from "./containers/public";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mymusic",
        element: <Personal />,
      },
    ],
  },
  //   {
  //     path: "/admin",
  //     element: <Public />,
  //     children: [
  //       {
  //         path: "home",
  //         element: <Home />,
  //       },
  //       {
  //         path: "login",
  //         element: <Login />,
  //       },
  //     ],
  //   },
]);

export default router;
