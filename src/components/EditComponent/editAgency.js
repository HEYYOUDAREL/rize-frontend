import React from "react";
import Swal from "sweetalert2";
import { clientID } from "../utils/clientID";
import { agencyID } from "../utils/agencyID";

export const EditAgency = ({ formState, closeEditModal }) => {
	
	const handleEditAgency = async () => {
	
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
			
			if (!agencyName) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Agency is required.",
                });
                return;
            }

            const getAgencyID = await agencyID(agencyName);

            if (!getAgencyID) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: `Agency '${agencyName}' not found.`,
                });
                return;
            }
			
			// Now you can proceed to edit the agency with the getClientID and getAgencyName
			const agencyResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/update/${getAgencyID}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					client: getClientID,
					agency: agencyName,
					category: formState.category,
					status: formState.status,
                    widgets: formState.widgets,
				}),
			});
			
			if (!agencyResponse.ok) {
				throw new Error(`Network response was not ok (status ${agencyResponse.status})`);
			}
			
			const agencyData = await agencyResponse.json();
			console.log(agencyData);
			
			if (agencyResponse.ok) {
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
		closeEditModal();
	};
	
	return (
		<button type="button" className="btn" onClick={handleEditAgency}>
		Edit Agency
		</button>
	);
};