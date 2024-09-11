import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VehiclePage() {
    const { vehicle } = useParams();
    const [vehicleData, setVehicleData] = useState(null);

    const fetchVehicle = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${vehicle}`);
            const data = await response.json();
            setVehicleData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (vehicle) fetchVehicle();
    }, [vehicle])

    return (
        <div className="vehiclepage">
            <div className="container">
                <div className="vehiclepage__wrapper">
                    {vehicleData ? (
                        <div>
                            <h2>{vehicleData.title}</h2>
                            <img src={vehicleData.images[0]} alt={vehicleData.title} width="200" />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}