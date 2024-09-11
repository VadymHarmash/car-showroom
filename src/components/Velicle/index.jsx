import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './vehicle.module.scss';

export default function Vehicle({ vehicle }) {
    const navigate = useNavigate()

    const handleClick = () => navigate(`/vehicles/${vehicle.id}`)

    return (
        <div key={vehicle.id} className={styles.vehicle} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h2 className={styles.vehicle__title}>{vehicle.title}</h2>
            {vehicle.images && vehicle.images.length > 0 && (
                <img
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className={styles.vehicle__image}
                />
            )}
            <div className={styles.vehicle__hover}><p>Tap to read more...</p></div>
        </div>
    );
}