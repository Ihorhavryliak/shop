import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";

const NavBreadcrumb = React.memo(() => {
  const breadcrumbs = useReactRouterBreadcrumbs([
    { path: "/products/product/", breadcrumb: null },
    { path: "/products/category/", breadcrumb: null },
  ]);
  console.log(breadcrumbs);
  const navigation = useLocation();
  const lastUrl = navigation.pathname;

  console.log(lastUrl);
  console.log(breadcrumbs);
  return (
    <>
      <div className="mt-4">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  {breadcrumbs.map((breadcrumbs) => {
                    return (
                      <li
                        key={breadcrumbs.key}
                        className="breadcrumb-item"
                        aria-current="page"
                      >
                        {breadcrumbs.key !== lastUrl ? (
                          <NavLink to={breadcrumbs.key}>
                            {breadcrumbs.breadcrumb}
                          </NavLink>
                        ) : (
                          breadcrumbs.breadcrumb
                        )}
                      </li>
                    );
                  })}
                  {/* 
              <li className="breadcrumb-item"><NavLink to="#!">Shop</NavLink></li>
              <li className="breadcrumb-item active" aria-current="page">Snacks &amp; Munchies</li> */}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <Outlet/> */}
    </>
  );
});

export default NavBreadcrumb;
