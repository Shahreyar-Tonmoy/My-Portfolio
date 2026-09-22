import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Routes from './Routes/Routes.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PortfolioProvider>
        <RouterProvider router={Routes} />
      </PortfolioProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
