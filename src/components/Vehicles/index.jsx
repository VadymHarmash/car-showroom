import React, { useEffect, useState } from 'react';
import styles from './vehicles.module.scss';
import Vehicle from "../Velicle";

export default function Vehicles({ searchText }) {
    const [vehicleData, setVehicleData] = useState([]);

    const filteredVehicles = vehicleData.filter((vehicle) =>
        vehicle.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const dataInit = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/category/vehicle', {
                method: "GET"
            });
            const data = await response.json();
            setVehicleData(data.products);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        dataInit();
    }, []);

    return (
        <div className={styles.vehicles}>
            {filteredVehicles && filteredVehicles.map((vehicle) => (
                <Vehicle key={vehicle.id} vehicle={vehicle}/>
            ))}
        </div>
    );
}
