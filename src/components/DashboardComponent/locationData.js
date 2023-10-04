import React, { useState, useEffect } from 'react';

const LocationData = () => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const locationResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`);
        const locationData = await locationResponse.json();
        setLocationData(locationData);
      } catch (error) {
        console.error('Error fetching location data:', error);
        // Handle errors here
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>All Location</h2>
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
          {locationData.map((location) => (
            <tr key={location.id}>
            <td>{location.client}</td>
            <td>{location.agency}</td>
            <td>{location.location}</td>
            <td>{location.category}</td>
            <td>{location.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationData;