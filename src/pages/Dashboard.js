import React, { useState, useEffect } from 'react';
import { AppNavbar } from "../components/AppNavbar";
import "./Dashboard.css"

const Dashboard = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [displayFields, setDisplayFields] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let apiUrl;
        let searchKey = 'Trial'; // Status to search for
  
        switch (dataType) {
          case 'client':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`;
            setDisplayFields(['client', 'agencies']);
            break;
          case 'agency':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
            setDisplayFields(['client', 'agency', 'locations', 'category', 'status']);
            break;
          case 'location':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
            setDisplayFields(['client', 'agency', 'location', 'category', 'status']);
            break;
          case 'trial': // New case for 'trial' status
            // Construct API endpoints for all three data types
            const clientApi = `${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`;
            const agencyApi = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
            const locationApi = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
  
            // Make parallel requests to all APIs and filter data with 'trial' status
            const [clientData, agencyData, locationData] = await Promise.all([
              fetch(clientApi).then(response => response.json()),
              fetch(agencyApi).then(response => response.json()),
              fetch(locationApi).then(response => response.json())
            ]);
  
            // Filter data with 'trial' status from all APIs
            const filteredData = [
              ...clientData.filter(item => item.status === searchKey),
              ...agencyData.filter(item => item.status === searchKey),
              ...locationData.filter(item => item.status === searchKey)
            ];
  
            // Set display fields and filtered data
            setDisplayFields(['client', 'agency', 'location', 'category', 'status']);
            setData(filteredData);
            return; // Exit the function after setting the data
        }
  
        // Fetch data for other cases (client, agency, location)
        if (apiUrl) {
          const response = await fetch(apiUrl);
          const responseData = await response.json();
          setData(responseData);
        }
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
      </div>
    </div>
  );
};

export default Dashboard;
