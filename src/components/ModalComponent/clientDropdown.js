import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import { AddClient } from "./addClient";

export const ClientDropdown = ({ onClientSelect }) => {
	
	const [allClients, setAllClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	
	const handleSelectChange = (selectedOption) => {
		setSelectedClient(selectedOption);
		
		// Pass the selected client to the parent component
		if (selectedOption) {
			onClientSelect(selectedOption.value);
		}
	};
	
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/all`)

		.then((response) => {
			console.log(response); // Log the response object
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => setAllClients(data))
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
	}, []);
	
	const addedClient = (clientName) => {
		// Call the AddClient function with the necessary parameters
		AddClient(clientName, setAllClients, setSelectedClient);
	};
	
	const options = allClients.map((opts) => ({
		label: opts.client,
		value: opts.client,
	}));
	
	return (
		<div>
			<CreatableSelect
				value={selectedClient}
				onChange={handleSelectChange}
				options={options}
				isClearable
				isSearchable
				onCreateOption={addedClient}
				placeholder="Enter Client Name"
			/>
		</div>
	);
};