import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { history } from "../utils/history";
import Header from "../components/Header";
import Routes from "./routes";
import Footer from "../components/Footer";

import { ToastContainer } from "react-toastify";
// import BackgroundWorker from "../components/BackgroundWorker";
import { signOut, tokenSignIn } from "../saga/actions/workflow";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.workflow.isLogged);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLogged) {
      const decoded = jwt_decode(token);
      if (decoded.exp <= Number(new Date()) / 1000) {
        localStorage.clear();
        dispatch(signOut());
      } else dispatch(tokenSignIn({ url: "/v1/userinfo" }));
    }
  }, []);
  return (
    <div className="relative font-poppins w-full h-full min-h-screen bg-[#DEE2E8] dark:bg-[#000000] transition-all duration-1000">
      <Router history={history}>
        <Header />
        <Routes />
        <Footer />
      </Router>
      <ToastContainer />
      {/* <BackgroundWorker /> */}
    </div>
  );
}

export default App;
