import React from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import "./App.css";
import Sidebar from "./component/Sidebar";
import Chat from "./component/Chat";
import Login from "./component/Login";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
const App=()=>{
const [{user}]=useStateValue();
   return(
        <div className="app">
         {
            !user ? (<h1><Login/></h1>)
            :(
        <div className="app_body">       
        <Router>
        <Sidebar/>
        <Routes>
        
        <Route path="/rooms/:roomId"
        element={
        <>
         <Chat/>
        </>}
        >
       </Route>

        <Route path="/" element={<><Chat/></>}>
        </Route>

        </Routes>
        </Router>
        </div>
             )
         }
        
        </div>
         )
}

export default App;