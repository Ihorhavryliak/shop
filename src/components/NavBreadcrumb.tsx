import React from "react";
import { Outlet } from "react-router-dom";

const NavBreadcrumb = React.memo(() => {
  return (<>
   <div className="container">
      <div className="row">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
     
        
    <div>link </div>
 
    </nav>
    </div>
      </div>
    {/* <Outlet/> */}</>
  );
});

export default NavBreadcrumb;
