import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./styles/SubCounter.css";

export const SubCounter = (formState) => {
    
    const [clientCount, setClientCount] = useState(0);
    const [agencyCount, setAgencyCount] = useState(0);
    const [locationCount, setLocationCount] = useState(0);
    const [trialCount, setTrialCount] = useState(0);
    
    useEffect(() => {

        async function fetchData() {

            try {
                
                // Fetch client count
                const clientResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`);
                const clientData = await clientResponse.json();
                setClientCount(clientData.length);
                
                // Fetch agency count
                const agencyResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`);
                const agencyData = await agencyResponse.json();
                setAgencyCount(agencyData.length);
                
                // Fetch location count
                const locationResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`);
                const locationData = await locationResponse.json();
                setLocationCount(locationData.length);
                
                // Combine agency and location data
                const combinedData = [...agencyData, ...locationData];
                
                // Filter combined data for trial accounts
                const trialAccounts = combinedData.filter(item => item.status === 'Trial');
                setTrialCount(trialAccounts.length);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors here, display a user-friendly message or log the error for debugging
            }
        }
        
        fetchData();
    }, [formState.selectedClient, formState.selectedAgency, formState.location]); // Include relevant variables in the dependency array
    
    return (
        <div className='main-sub'>
            <table className='table-wrapper'>
            <tbody>
                <tr>
                    <td><Link to="/dashboard/client" className='count'>{clientCount}</Link></td>
                    <td><Link to="/dashboard/agency" className='count'>{agencyCount}</Link></td>
                    <td><Link to="/dashboard/location" className='count'>{locationCount}</Link></td>
                    <td><Link to="/dashboard/trial" className='count'>{trialCount}</Link></td>
                </tr>
                <tr>
                    <td className='countname'>
                        <span className='bordered-span'>Unique Clients</span>
                    </td>
                    <td className='countname'>
                        <span className='bordered-span'>Agencies</span>
                    </td>
                    <td className='countname'>
                        <span className='bordered-span'>Locations</span>
                    </td>
                    <td className='countname'>
                        <span className='bordered-span'>Trial Accounts</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};
    