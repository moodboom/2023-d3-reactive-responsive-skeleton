import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* MDM NOTE that StrictMode causes double-render in dev mode. */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
)
