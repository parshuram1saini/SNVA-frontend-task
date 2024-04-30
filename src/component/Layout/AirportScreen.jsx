import React, { useEffect, useState } from 'react'
import "./layout.css"
import axios from 'axios';
import { airPortData } from '../data'
import { ACCESS_KEY } from '../../config';

function AirportListScreen() {
    const [clientInfo, setClientInfo] = useState({ ip: '', country: '' });
    const [cloneAirports, setCloneAirports] = useState([]);
    const [sortedAirports, setSortedAirports] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://ipinfo.io/?token=${ACCESS_KEY}`);
                setClientInfo({
                    ip: response.data.ip,
                    country: response.data.country
                });
            } catch (error) {
                console.error('Error fetching IP info:', error);
            }
        })()
    }, []);

    useEffect(() => {
        // Sort the airports based on the client's country
        if (clientInfo.country && airPortData.length > 0) {

            const sortedData = airPortData.sort((a, b) => {
                if (a.countryCode === clientInfo.country) return -1;
                if (b.countryCode === clientInfo.country) return 1;
                return 0;
            });

            setSortedAirports(sortedData);
            setCloneAirports(sortedData);

        }
    }, [clientInfo.country]);

    function handleSearch(e) {
        const newData = cloneAirports.filter((element, index) => {
            return (element.cityName.toLowerCase().includes(e.toLowerCase()));
        });

        setSortedAirports(newData);
    }

    return (
        <div className="width-40">
            <div>
                <h4 style={{ textAlign: "center" }}>Select Depart City</h4>
                <div className="flex-row align-center justify-between border-bottom-gray">
                    <div className="headingWrapper flex-col width-40">
                        <small className="head1">Depart From</small>
                        <input style={{ border: "none", margin: "10px 0" }} className="head2" type='search' onKeyUp={(e) => handleSearch(e.target.value)} placeholder='Search ....' />
                    </div>
                    <div className="headingWrapper flex-col width-40">
                        <small className="head1 text-align-end">Going To</small>
                        <h2 style={{ margin: 0 }} className="text-align-end">Mumbai</h2>
                        <small className="head2 text-align-end">BOM</small>
                    </div>
                </div>
                <div className='Airports-wrapper'>
                    {sortedAirports.map((item, index) => (
                        <div className='table-row flex-row align-center justify-between' key={index}>
                            <div className='flex-col align-flex-start'>
                                <div style={{ fontWeight: 500, fontSize: "16px" }}> {item.cityName}</div>
                                <div style={{ color: "gray" }} className='head2'> {item.airportName}</div>
                            </div>
                            <div> {item.countryName}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AirportListScreen
