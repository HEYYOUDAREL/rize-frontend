import React, { useState, useEffect } from "react";
import { agencyID } from "../utils/agencyID";

export const AgencyCategory = ({ formState }) => {
	const [agencyCategory, setAgencyCategory] = useState(null);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const getCategory = async () => {
			
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
					
					// Set agencyCategory with the category string
					setAgencyCategory(data.category);
					
				} catch (error) {
					setError("Error fetching data. Please try again later.");
					console.error("Error fetching data:", error);
				}
			};
			
			getCategory();
	}, [formState.selectedAgency]);
	
	return (
		<div>
			{error ? (
				<p>Error: {error}</p>
				) : (
				agencyCategory && <p>{agencyCategory}</p>
			)}
		</div>
	);
};