import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Public, Personal, Album } from "./containers/public";

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
      {
        path: "album/:title/:pid",
        element: <Album />,
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
