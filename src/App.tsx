import { Footer, Header, Navbar } from "./components";
import "./sass/main.scss";
import { AppRouters } from "./AppRouters";
import { useEffect } from "react";
import { getCategory } from "./reducers/category-reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./reducers/redux-store";
import { useLocation } from "react-router-dom";
import { FooterAdmin, HeaderAdmin, SidebarAdmin } from "./admin/components";

function App() {
  const navigation = useLocation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <>
      {navigation.pathname.includes("admin") ? (
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
          <Header />
          <Navbar />
          <AppRouters />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
