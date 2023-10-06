import React, { useState, useEffect } from 'react';
import { AppNavbar } from "../components/AppNavbar";
import "./Dashboard.css"

const Dashboard = ({ dataType }) => {
    const [data, setData] = useState([]);
    const [displayFields, setDisplayFields] = useState([]);
    const [clientCount, setClientCount] = useState(0);
    const [agencyCount, setAgencyCount] = useState(0);
    const [locationCount, setLocationCount] = useState(0);

    const sortData = (data) => {
        return data.sort((a, b) => {
            // Sort by client
            if (a.client > b.client) return 1;
            if (a.client < b.client) return -1;

            // Sort by agency within the same client
            if (a.agency > b.agency) return 1;
            if (a.agency < b.agency) return -1;

            // Sort by location within the same agency
            if (a.location > b.location) return 1;
            if (a.location < b.location) return -1;

            return 0;
        });
    };

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
                        break;
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

                // Count clients, agencies, and locations
                const clientCount = new Set(filteredData.map(item => item.client)).size;
                const agencyCount = new Set(filteredData.map(item => item.agency)).size;
                // Count locations based on the 'locations' field
                const locationCount = filteredData.reduce((count, item) => {
                    if (item.locations && Array.isArray(item.locations)) {
                        return count + item.locations.length;
                    }
                    return count;
                }, 0);

                // Sort the filtered data
                const sortedData = sortData(filteredData);

                // Set display fields, filtered data, and counts in the state
                setDisplayFields(['client', 'agency', 'location', 'category', 'status', 'widgets']);
                setData(sortedData);
                setClientCount(clientCount);
                setAgencyCount(agencyCount);
                setLocationCount(locationCount);
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
            <div className='subdashboard-counter'>
              <table className='table-wrapper'>
                <tbody>
                  <tr>
                    <td className='count'>{clientCount}</td>
                    <td className='count'>{agencyCount}</td>
                    <td className='count'>{locationCount}</td>
                  </tr>
                  <tr>
                    <td><span className='bordered-span'>Unique Clients</span></td>
                    <td><span className='bordered-span'>Agencies</span></td>
                    <td><span className='bordered-span'>Locations</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="dashboard-container">
                {data.length === 0 ? (
                    <p>No accounts found.</p>
                ) : (
                    <table className="dashboard-table">
                        <thead className="dashboard-thead">
                            <tr>
                                {displayFields.map((field) => (
                                    <th key={field} className="dashboard-th">
                                        {field}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    {displayFields.map((field) => (
                                        <td key={field} className={`dashboard-td ${field}-td`}>
                                            {Array.isArray(item[field]) ? (
                                                item[field].map((value, idx) => (
                                                    <div key={idx}>{value}</div>
                                                ))
                                            ) : (
                                                item[field]
                                            )}
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