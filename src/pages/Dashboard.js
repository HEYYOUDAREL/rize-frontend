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

        // Determine the API URL and display fields based on the dataType prop
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
          default:
            apiUrl = ''; // Handle invalid dataType here
            break;
        }

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
