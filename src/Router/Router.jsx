import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import VehiclePage from "../pages/VehiclePage";

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='vehicles/:vehicle' element={<VehiclePage />} />
        </Routes>
    );
}