import React from 'react';
import Vehicles from "../../components/Vehicles";

export default function HomePage() {
    return (
        <div className="homepage">
            <div className="container">
                <div className="homepage__wrapper">
                    <input/>
                    <h1>Vehicle Data</h1>
                    <Vehicles/>
                </div>
            </div>
        </div>
    );
}