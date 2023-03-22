import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProSidebarProvider } from 'react-pro-sidebar';
import RecipeState from './Context/RecipeState';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider>
   <BrowserRouter>
  <ProSidebarProvider>
  <React.StrictMode>
 <RecipeState>
    <App />
    </RecipeState>
  </React.StrictMode>
  </ProSidebarProvider>
  </BrowserRouter>
  </NextUIProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
