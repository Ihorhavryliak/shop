import { Footer, Header, Navbar } from "./components";
import "./styles/main.scss";
import { AppRouters } from "./AppRouters";
import { useEffect, useState } from "react";
import { getCategory } from "./reducers/category-reducer/category-reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./reducers/redux-store";
import { useLocation } from "react-router-dom";
import { FooterAdmin, HeaderAdmin, SidebarAdmin } from "./admin/components";
import { motion } from "framer-motion";
import { variants } from "./utils/Animation";

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const location = useLocation();

  const [play, setPlay] = useState(false);

  useEffect(() => {
    const onPage = () => {
      setPlay(true);
    };
    if (document.readyState === "complete") {
      onPage();
    } else {
      window.addEventListener("load", onPage);
    }
    return () => window.removeEventListener("load", onPage);
  }, []);



  return (
    <>
      {location.pathname.includes("admin") ? (
        <>
          {/* "Admin" */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-3 col-xxl-2 col-xl-3  col-lg-3 col-md-4 col-sm-5 boxSidebar p-3 text-white bg-dark">
                <SidebarAdmin />
              </div>
              <div className="col-9 col-xxl-9 col-xl-9 col-lg-9 col-md-8 col-sm-7">
                <HeaderAdmin />
                <AppRouters />
                <FooterAdmin />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
      
          {/* "Users" */}
          {/* <HeaderStick /> */}

              <motion.div 
               animate={play ? "open" : "closed"}
        variants={variants}
        
        >
            <Header />
            <Navbar />
            <AppRouters />
            <Footer />
            </motion.div>
    
        </>
      )}
    </>
  );
}

export default App;
