import { useEffect } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import * as actions from "./store/actions";
import router from "./routers";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, []);

  return (
    <>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
