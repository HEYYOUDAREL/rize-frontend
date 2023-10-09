import React, { useState, useEffect } from 'react';
import { AppNavbar } from '../components/AppNavbar';
import './Dashboard.css';

const Dashboard = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [displayFields, setDisplayFields] = useState([]);
  const [activeWidgetsCount, setActiveWidgets] = useState(0);
  const [noWidgetsCount, setNoWidgets] = useState(0);

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a.client > b.client) return 1;
      if (a.client < b.client) return -1;
      if (a.agency > b.agency) return 1;
      if (a.agency < b.agency) return -1;
      if (a.location > b.location) return 1;
      if (a.location < b.location) return -1;
      return 0;
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let apiUrl;
        let searchKey = 'Trial';

        switch (dataType) {
          case 'client':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`;
            setDisplayFields(['client', 'agencies']);
            break;
          case 'agency':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`;
            setDisplayFields(['client', 'agency', 'locations', 'category', 'status', 'widgets']);
            break;
          case 'location':
            apiUrl = `${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`;
            setDisplayFields(['client', 'agency', 'location', 'category', 'status', 'widgets']);
            break;
          case 'trial':
            const [clientData, agencyData, locationData] = await Promise.all([
              fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`).then(response => response.json()),
              fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`).then(response => response.json()),
              fetch(`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`).then(response => response.json())
            ]);

            const filteredData = [
              ...clientData.filter(item => item.status === searchKey),
              ...agencyData.filter(item => item.status === searchKey),
              ...locationData.filter(item => item.status === searchKey)
            ];

            setDisplayFields(['client', 'agency', 'location', 'category', 'status', 'widgets']);
            setData(sortData(filteredData));
            break;

            case 'widgets':
              const [clientWidgetData, agencyWidgetData, locationWidgetData] = await Promise.all([
                fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`).then(response => response.json()),
                fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/all`).then(response => response.json()),
                fetch(`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/all`).then(response => response.json())
              ]);
            
              const filteredWidgetData = [
                ...clientWidgetData.filter(item => item.widgets === 'Active'),
                ...agencyWidgetData.filter(item => item.widgets === 'Active'),
                ...locationWidgetData.filter(item => item.widgets === 'Active')
              ];
            
              // Count active widgets and no widgets
              const activeWidgetsCount = filteredWidgetData.filter(item => item.widgets === 'Active').length;
              const noWidgetsCount = filteredWidgetData.filter(item => item.widgets === 'None').length;
            
              setActiveWidgets(activeWidgetsCount);
              setNoWidgets(noWidgetsCount);
            
              setDisplayFields(['client', 'agency', 'location', 'category', 'status', 'widgets']);
              setData(sortData(filteredWidgetData));
              break;            
        }

        if (apiUrl) {
          const response = await fetch(apiUrl);
          const responseData = await response.json();
          const sortedData = sortData(responseData);
          setData(sortedData);
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
      <div className='subdashboard-counter'>
        <table className='table-wrapper'>
          <tbody>
            <tr>
              <td className='count'>{activeWidgetsCount}</td>
              <td className='count'>{noWidgetsCount}</td>
            </tr>
            <tr>
              <td><span className='bordered-span'>Active Widgets</span></td>
              <td><span className='bordered-span'>No Widgets</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className='dashboard-container'>
        {data.length === 0 ? (
            <p>No accounts found.</p>
        ) : (
          <table className='dashboard-table'>
            <thead className='dashboard-thead'>
              <tr>
                {displayFields.map((field) => (
                  <th key={field} className='dashboard-th'>
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
                      {Array.isArray(item[field])
                        ? item[field].map((value, idx) => <div key={idx}>{value}</div>)
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