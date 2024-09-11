import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './vehiclePage.module.scss';

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
    }, [vehicle]);

    return (
        <div className={styles.vehiclepage}>
            <div className="container">
                <div className={styles.vehiclepage__wrapper}>
                    <a href='/' className={styles.vehiclepage__undo}>←</a>
                    {vehicleData ? (
                        <div>
                            <h2>{vehicleData.title}</h2>
                            <img
                                src={vehicleData.images[0] || vehicleData.thumbnail}
                                alt={vehicleData.title}
                                width="300"
                            />
                            <p>{vehicleData.description}</p>
                            <p><span>Price:</span> ${vehicleData.price}</p>
                            <p><span>Rating:</span> {vehicleData.rating} / 5</p>
                            <p><span>Stock:</span> {vehicleData.stock > 0 ? "Є в наявності" : "Немає в наявності"}</p>
                            <p><span>Warranty:</span> {vehicleData.warrantyInformation}</p>

                            {vehicleData.reviews && (
                                <div>
                                    <h3>Rewiews:</h3>
                                    <ul>
                                        {vehicleData.reviews.map((review, index) => (
                                            <li key={index}>
                                                <p><span>{review.reviewerName}</span> ({review.rating}/5): {review.comment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
