import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./styles/Counter.css";

export const Counter = (formState) => {
  const [clientCount, setClientCount] = useState(0);
  const [agencyCount, setAgencyCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [reviewtrackersCount, setReviewtrackersCount] = useState(0);
  const [reviewshakeCount, setReviewshakeCount] = useState(0);
  const [rizeCount, setRizeCount] = useState(0);
  const [gradeUsCount, setGradeUsCount] = useState(0);
  const [whitelabelCount, setWhitelabelCount] = useState(0);

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
            
            // Filter combined data for different categories
            const reviewtrackersAccounts = combinedData.filter(item => item.category === 'Reviewtrackers');
            setReviewtrackersCount(reviewtrackersAccounts.length);
            
            const reviewshakeAccounts = combinedData.filter(item => item.category === 'Reviewshake');
            setReviewshakeCount(reviewshakeAccounts.length);
            
            const rizeAccounts = combinedData.filter(item => item.category === 'Rize Partner');
            setRizeCount(rizeAccounts.length);
            
            const gradeUsAccounts = combinedData.filter(item => item.category === 'Grade.us');
            setGradeUsCount(gradeUsAccounts.length);
            
            const whitelabelAccounts = combinedData.filter(item => item.category === 'White Label');
            setWhitelabelCount(whitelabelAccounts.length);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
      fetchData();
  }, []);
    
    return (
        <div className='main'>  
            <table className='table-wrapper'>
                <tbody>
                    <tr>
                        <td>
                            <img src={process.env.PUBLIC_URL + '/images/rize-logo.png'} alt="Rize Partner" />
                        </td>
                        <td>
                            <img src={process.env.PUBLIC_URL + '/images/reviewtrackers.png'} alt="Reviewtrackers" />
                        </td>
                        <td>
                            <img src={process.env.PUBLIC_URL + '/images/reviewshake.png'} alt="Reviewshake" />
                        </td>
                        <td>
                            <img src={process.env.PUBLIC_URL + '/images/grade.png'} alt="Grade.us" />
                        </td>
                        <td>
                            <img src={process.env.PUBLIC_URL + '/images/whitelabel.png'} alt="Whitelabel" />
                        </td>
                    </tr>
                    <tr>
                        <td><Link to="/dashboard/rize" className='count'>{rizeCount}</Link></td>
                        <td><Link to="/dashboard/reviewtrackers" className='count'>{reviewtrackersCount}</Link></td>
                        <td><Link to="/dashboard/reviewshake" className='count'>{reviewshakeCount}</Link></td>
                        <td><Link to="/dashboard/grade" className='count'>{gradeUsCount}</Link></td>
                        <td><Link to="/dashboard/whitelabel" className='count'>{whitelabelCount}</Link></td>
                    </tr>
                    <tr>
                        <td><span className='bordered-span'>Rize Partner</span></td>
                        <td><span className='bordered-span'>Reviewtrackers</span></td>
                        <td><span className='bordered-span'>Reviewshake</span></td>
                        <td><span className='bordered-span'>Grade.us</span></td>
                        <td><span className='bordered-span'>White Label</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};