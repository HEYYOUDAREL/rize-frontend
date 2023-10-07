import React, { useState, useEffect } from "react";
import { locationID } from "../utils/locationID";

export const LocationWidgets = ({ formState }) => {
	const [locationWidgets, setLocationWidgets] = useState("");
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const getWidgets = async () => {
			if (!formState.selectedLocation) {
				return;
			}
			
			try {
				const locationName = formState.selectedLocation;
				const getLocationID = await locationID(locationName);
				
				if (!getLocationID) {
					setError("Location not found or an error occurred.");
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
					
					// Set locationWidgets with the widgets string
					setLocationWidgets(data.widgets);
					
				} catch (error) {
					setError("Error fetching data. Please try again later.");
					console.error("Error fetching data:", error);
				}
			};
			
			getWidgets();
	}, [formState.selectedLocation]);
	
	return (
		<div>
			{error ? (
				<p>Error: {error}</p>
				) : (
				<p>{locationWidgets}</p>
			)}
		</div>
	);
};