import React, { useState, useEffect } from 'react';

const ClientData = () => {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const clientResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`);
        const clientData = await clientResponse.json();
        setClientData(clientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
        // Handle errors here
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>All Unique Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Agencies</th>
          </tr>
        </thead>
        <tbody>
          {clientData.map((client) => (
            <tr key={client.id}>
                <td>{client.client}</td>
                <td>{client.agencies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientData;