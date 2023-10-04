import React, { useState, useEffect } from 'react';

const AgencyData = () => {
  const [agencyData, setAgencyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const agencyResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`);
        const agencyData = await agencyResponse.json();
        setAgencyData(agencyData);
      } catch (error) {
        console.error('Error fetching agency data:', error);
        // Handle errors here
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>All Agencies</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Agency</th>
            <th>Location</th>
            <th>Designation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {agencyData.map((agency) => (
            <tr key={agency.id}>
                <td>{agency.client}</td>
                <td>{agency.agency}</td>
                <td>{agency.locations}</td>
                <td>{agency.category}</td>
                <td>{agency.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgencyData;