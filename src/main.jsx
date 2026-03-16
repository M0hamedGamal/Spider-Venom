import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CssBaseline from "@mui/material/CssBaseline";
import {responsiveFontSizes, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router";

let router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
