import React, { useState, useEffect } from "react";
import Select from "react-select";
import { clientID } from "../utils/clientID";
import { agencyID } from "../utils/agencyID";

export const LocationDropdown = ({ formState, onLocationSelect }) => {
	const [allLocations, setAllLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	
	useEffect(() => {
		const fetchLocations = async () => {
			
			if (!formState || !formState.selectedClient || !formState.selectedAgency) {
				// Handle the case where selectedClient or selectedAgency is not available
				return;
			}
			
			try {
				const clientName = formState.selectedClient;
				const getClientID = await clientID(clientName, formState);
				
				const agencyName = formState.selectedAgency;
				const getAgencyID = await agencyID(agencyName, formState);
				
				const locationName = formState.selectedLocation;
				
				if (!getClientID || !getAgencyID) {
					return; // Return if clientId or agencyId is not available
				}
				
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/${getAgencyID}`
					);
					
					if (!response.ok) {
						throw new Error(`Network response was not ok (status ${response.status})`);
					}
					
					const data = await response.json();
					
					// Extract locations from the "locations" array
					const agencyLocations = data.locations.map((locationData) => ({
						label: locationData.location,
						value: locationData.location,
					}))

					// Sort the location alphabetically by label
					const sortedLocations = agencyLocations.sort((a, b) => a.label.localeCompare(b.label));
					setAllLocations(sortedLocations);

				} catch (error) {
					console.error("Error fetching data:", error);
					// Handle the error, e.g., show an error message to the user
				}
			};
			
			fetchLocations();
		}, [formState.selectedAgency]);
		
		const handleSelectChange = (selectedOption) => {
			setSelectedLocation(selectedOption);
			
			if (selectedOption) {
				onLocationSelect(selectedOption.value);
			}
		};
		
		return (
			<div>
				<Select
					value={selectedLocation}
					onChange={handleSelectChange}
					options={allLocations}
					isClearable
					isSearchable
					placeholder="Select Location"
				/>
			</div>
		);
	};