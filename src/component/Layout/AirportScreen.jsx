import React from 'react'
import "./layout.css"
import { airPortData } from '../data'

function AirportListScreen() {

    const sortedAirPortData = airPortData.sort((a, b) => {
        const airportNameA = a.airportName.toUpperCase();
        const airportNameB = b.airportName.toUpperCase();

        if (airportNameA < airportNameB) {
            return -1;
        }
        if (airportNameA > airportNameB) {
            return 1;
        }
        return 0;

    });

    return (
        <div>
            <div>
                <h3>List of Airports: {" "} Order by Airport</h3>
                <div className='Airports-wrapper'>
                    {sortedAirPortData.map((airport, index) => (
                        <div className='table-row flex-row align-center justify-between' key={index}>
                            <div> {airport.airportName}</div>
                            <div> {airport.airportCode}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AirportListScreen
