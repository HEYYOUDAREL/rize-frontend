import React, { useState, useEffect } from "react";
import { agencyID } from "../utils/agencyID";

export const AgencyWidgets = ({ formState }) => {
	const [agencyWidgets, setAgencyWidgets] = useState(null);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const getWidgets = async () => {
			
			if (!formState.selectedAgency) {
				return;
			}
			
			try {
				const agencyName = formState.selectedAgency;
				const getAgencyID = await agencyID(agencyName);
				
				if (!getAgencyID) {
					setError("Agency not found or an error occurred.");
					return;
				}
				
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/${getAgencyID}`
					);
					
					if (!response.ok) {
						setError(`Network response was not ok (status ${response.status}).`);
						return;
					}
					
					const data = await response.json();
					
					// Set agencyWidgets with the wdigets string
					setAgencyWidgets(data.widgets);
					
				} catch (error) {
					setError("Error fetching data. Please try again later.");
					console.error("Error fetching data:", error);
				}
			};
			
			getWidgets();
	}, [formState.selectedAgency]);
	
	return (
		<div>
			{error ? (
				<p>Error: {error}</p>
				) : (
				<p>{agencyWidgets}</p>
			)}
		</div>
	);
};