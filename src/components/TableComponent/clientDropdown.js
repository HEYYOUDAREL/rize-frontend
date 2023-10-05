import React, { useState, useEffect } from "react";
import Select from 'react-select';

export const ClientDropdown = ({ formState, onClientSelect }) => {
	const [allClients, setAllClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				
				// Sort the clients alphabetically
				const sortedOptions = data.map((opts) => ({
					label: opts.client,
					value: opts.client,
				})).sort((a, b) => a.label.localeCompare(b.label));

				setAllClients(sortedOptions);
				
			} catch (error) {
				console.error("Error fetching data:", error);
				// Handle the error, e.g., show an error message to the user
			}
		}
		
		fetchData();
	}, []);
	
	const handleSelectChange = (selectedOption) => {
		setSelectedClient(selectedOption);
		
		// Pass the selected client to the parent component
		if (selectedOption) {
			onClientSelect(selectedOption.value);
		}
	};
	
	return (
		<div>
			<Select
				value={selectedClient}
				onChange={handleSelectChange}
				options={allClients}
				isClearable
				isSearchable
				placeholder="Select Client"
			/>
		</div>
	);
};