import React from "react";
import './Admin.css';
import Sidebar from "../components/dashboard/Sidebar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import TeaMenuPage from "./TeaMenuAdmin";
import FoodMenuPage from "./FoodMenuAdmin";
import FoodPairingPage from "./FoodPairingAdmin";
import StaffPage from "./StaffPage";

const Admin = () => {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/tea-menu-admin" element={<TeaMenuPage/>}/>
                    <Route path="/food-menu-admin" element={<FoodMenuPage/>}/>
                    <Route path="/food-pairing-admin" element={<FoodPairingPage/>}/>
                    <Route path="/staff" element={<StaffPage/>}/>
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}

export default Admin;