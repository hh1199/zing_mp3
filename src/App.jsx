import { useEffect } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import * as actions from "./store/actions";
import router from "./routers";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
      {/* Same as */}
      <ToastContainer />;
    </>
  );
}
