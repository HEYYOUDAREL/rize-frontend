import React from "react";
import Swal from "sweetalert2";
import { clientID } from "../utils/clientID";

export const AddAgency = ({ formState, defaultValue, setFormState, closeModal }) => {
	
	const handleAddAgency = async () => {
	
	console.log("Selected Client:", formState.selectedClient); // Add this line for debugging

		try {

			const clientName = formState.selectedClient;
			
			if (!clientName) {
				// Display an alert if clientName is missing
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: "Client name is required.",
				});
				return; // Exit the function to prevent further execution
			}
			
			const getClientID = await clientID(clientName);
			
			const agencyName = formState.selectedAgency;
			
			if (!getClientID) {
				throw new Error('Client not found.');
			}
			
			// Now you can proceed to add the agency with the getClientID and getAgencyName
			const agencyResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					client: getClientID,
					agency: agencyName,
					category: formState.category,
					status: formState.status,
				}),
			});
			
			if (!agencyResponse.ok) {
				throw new Error(`Network response was not ok (status ${agencyResponse.status})`);
			}
			
			const agencyData = await agencyResponse.json();
			console.log(agencyData);
			
			if (agencyData.message && agencyData.message === 'Agency already exists.') {
				// Display the error message from the backend.
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: agencyData.message,
				});
				return;
			} else {
				Swal.fire({
					title: "Agency successfully added",
					icon: "success",
					text: `${agencyName} is now added`,
				});
			}
		} catch (error) {
			console.error("Error:", error);
			Swal.fire({
				title: "Error!",
				icon: "error",
				text: `Something went wrong. Please try again later!`,
			});
		}
		
		// Reset selectedClient and selectedAgency to their default values
		setFormState((prevState) => {
			const newState = {
			...prevState,
			selectedClient: defaultValue.selectedClient !== undefined ? defaultValue.selectedClient : null,
			selectedAgency: defaultValue.selectedAgency !== undefined ? defaultValue.selectedAgency : null,
			};
			return newState;
		});  
		
		// Close the modal
		closeModal();
	};
	
	return (
		<button type="button" className="btn" onClick={handleAddAgency}>
		Add Agency
		</button>
	);
};