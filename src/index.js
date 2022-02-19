import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "./features/theme";
import {
   BrowserRouter,
   Routes,
   Route
} from "react-router-dom";
import UserInfo from "./pages/UserInfo"
const store = configureStore({
   reducer: {
      theme: themeReducer,
   },
});


ReactDOM.render(
   <BrowserRouter>
      <Provider store={store}>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="userId" element={<UserInfo />} />
         </Routes>
      </Provider>
   </BrowserRouter>,
   document.getElementById('root'))
