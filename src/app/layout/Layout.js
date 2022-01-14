import React from 'react';
import AppContext from '../AppContext';
import { renderRoutes} from 'react-router-config';
import {
  HashRouter,
} from "react-router-dom";


function Layout(props) {
  return (
       <AppContext.Consumer>
        {({ routes }) => (
      <div >
          <HashRouter>
             {
              renderRoutes(routes)
             }
              </HashRouter>
      </div>
        )}
    </AppContext.Consumer>
  );
}

export default Layout;