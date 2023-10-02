import React, { useState, useEffect } from "react";
import { locationID } from "../utils/locationID";

export const LocationStatus = ({ formState }) => {
	const [locationStatus, setLocationStatus] = useState("");
	const [error, setError] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);
	
	useEffect(() => {
		const getStatus = async () => {
			if (!formState || !formState.selectedLocation) {
				return;
			}
			
			try {
				const locationName = formState.selectedLocation;
				const getLocationID = await locationID(locationName);
				
				if (!getLocationID) {
					setError("Agency not found or an error occurred.");
					return;
				}
				
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/${getLocationID}`
					);
					
					if (!response.ok) {
						setError(`Network response was not ok (status ${response.status}).`);
						return;
					}
					
					const data = await response.json();
					
					// Set locationStatus with the status string
					setLocationStatus(data.status);
					
				} catch (error) {
					setError("Error fetching data. Please try again later.");
					console.error("Error fetching data:", error);
				}
			};
			
			getStatus();
	}, [formState.selectedLocation]);
		
	return (
		<div>
			{error ? (
				<p>Error: {error}</p>
				) : (
				<p>{locationStatus}</p>
			)}
		</div>
	);
};