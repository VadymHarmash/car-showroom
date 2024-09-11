import React, { useState } from 'react';
import Vehicles from "../../components/Vehicles";
import styles from './homePage.module.scss';

export default function HomePage() {
    const [searchText, setSearchText] = useState('');

    return (
        <div className={styles.homepage}>
            <div className="container">
                <div className={styles.homepage__wrapper}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <h1>Vehicle Data</h1>
                    <Vehicles searchText={searchText} />
                </div>
            </div>
        </div>
    );
}
