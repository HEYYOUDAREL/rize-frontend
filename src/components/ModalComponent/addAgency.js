import React from "react";
import Swal from "sweetalert2";
import { clientID } from "../utils/clientID";

export const AddAgency = ({ formState, defaultValue, setFormState, closeModal }) => {
	
	const handleAddAgency = async () => {

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
					widgets: formState.widgets,
					notes: formState.notes,
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
				}).then(() => {
					// Reload the page after the SweetAlert success message
					window.location.reload();
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
		
		// Close the modal
		closeModal();
	};
	
	return (
		<button type="button" className="btn" onClick={handleAddAgency}>
		Add Agency
		</button>
	);
};