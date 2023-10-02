import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { clientID } from "../utils/clientID";

export const AgencyDropdown = ({ formState, onAgencySelect, setIsAddingAgency }) => {
	const [allAgencies, setAllAgencies] = useState([]);
	const [selectedAgency, setSelectedAgency] = useState(null);

	useEffect(() => {
		const fetchAgencies = async () => {
			// Check if a client has been selected
			if (!formState || !formState.selectedClient) {
				return;
			}

			try {
				const clientName = formState.selectedClient;
				const getClientID = await clientID(clientName);

				if (!getClientID) {
					return;
				}

				const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/${getClientID}`);
				if (!response.ok) {
					throw new Error(`Network response was not ok (status ${response.status})`);
				}

				const data = await response.json();

				// Extract agencies from the "agencies" array
				const clientAgencies = data.agencies.map((agencyData) => ({
					label: agencyData.agency,
					value: agencyData.agency,
				}));

				setAllAgencies(clientAgencies);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchAgencies();
	}, [formState.selectedClient]);

	const handleSelectChange = (selectedOption) => {
		setSelectedAgency(selectedOption);

		if (selectedOption) {
			onAgencySelect(selectedOption.value);
		}
	};

	const createAgencyName = (inputValue) => {
		const newOption = {
			label: inputValue,
			value: inputValue,
		};

		setSelectedAgency(newOption);
		onAgencySelect(newOption.value);

		// Set isAddingAgency to true when creating a new agency
		setIsAddingAgency(true);
	};

	return (
		<CreatableSelect
			value={selectedAgency}
			onChange={handleSelectChange}
			options={allAgencies}
			isClearable
			isSearchable
			onCreateOption={createAgencyName}
			placeholder="Enter Agency Name"
		/>
	);
};