import React, { useState, useEffect } from 'react';
import { AppNavbar } from "../components/AppNavbar";
import "./Dashboard.css"

const Dashboard = ({ dataType }) => {
    const [data, setData] = useState([]);
    const [displayFields, setDisplayFields] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                let agencyApi, locationApi;
                let searchKey;
        
                switch (dataType) {
                    case 'reviewtrackers':
                        searchKey = 'Reviewtrackers';
                        // Construct API endpoints for all three data types
                        agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
                        locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
                        break;

                    case 'reviewshake':
                        searchKey = 'Reviewshake';
                        // Construct API endpoints for all three data types
                        agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
                        locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
                        break;

                    case 'rize':
                        searchKey = 'Rize Partner';
                        // Construct API endpoints for all three data types
                        agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
                        locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
                        break;

                    case 'grade':
                        searchKey = 'Grade.us';
                        // Construct API endpoints for all three data types
                        agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
                        locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
                        break;

                    case 'whitelabel':
                        searchKey = 'White Label';
                        // Construct API endpoints for all three data types
                        agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
                        locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
                }
        
                // Make parallel requests to all APIs and filter data
                const [agencyData, locationData] = await Promise.all([
                    fetch(agencyApi).then(response => response.json()),
                    fetch(locationApi).then(response => response.json())
                ]);
        
                // Filter data from all APIs
                const filteredData = [
                    ...agencyData.filter(item => {
                        return item.category === searchKey;
                    }),
                    ...locationData.filter(item => {
                        return item.category === searchKey;
                    })
                ];
        
                // Set display fields and filtered data
                setDisplayFields(['client', 'agency', 'location', 'category', 'status']);
                setData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors here, display a user-friendly message or log the error for debugging
            }
        }        
        
        fetchData();
    }, [dataType]);
    
    
    return (
        <div>
            <AppNavbar />
            <div className='dashboard-container'>
                {data.length === 0 ? (
                    <p>No accounts found.</p>
                ) : (
                    <table className="dashboard-table">
                        <thead className="dashboard-thead">
                            <tr>
                                {displayFields.map((field) => (
                                    <th key={field} className="dashboard-th">{field}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    {displayFields.map((field) => (
                                        <td key={field} className="dashboard-td">
                                        {Array.isArray(item[field])
                                            ? item[field].map((value, idx) => (
                                                <div key={idx}>{value}</div>
                                                ))
                                                : item[field]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
                        