import { BrowserRouter as Router, Route } from "react-router-dom";
import { Children, useEffect } from 'react';


function Layout({children}) {

  return (
    <div>
        {children}
    </div>
  );
}

export default Layout;
