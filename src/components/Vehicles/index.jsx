import React, {useEffect, useState} from 'react';
import styles from './vehicles.module.scss'
import Vehicle from "../Velicle";

export default function Vehicles() {
    const [vehicleData, setVehicleData] = useState([]);

    const dataInit = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/category/vehicle', {
                method: "GET"
            })
            const data = await response.json()
            setVehicleData(data.products)
        } catch (error) {
            console.error(error)
            return []
        }
    }

    useEffect(() => {
        dataInit()
    }, [])
    return (
        <div className={styles.vehicles}>
            {vehicleData && vehicleData.map((vehicle) => (
                <Vehicle key={vehicle.id} vehicle={vehicle}/>
            ))}
        </div>
    )
}