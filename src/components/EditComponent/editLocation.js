import React from "react";
import Swal from "sweetalert2";
import { locationID } from "../utils/locationID";

export const EditLocation = ({ formState, closeEditModal }) => {
	
	const handleEditLocation = async () => {

		try {
			
			const locationName = formState.location;
			
			if (!locationName) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Location is required.",
                });
                return;
            }

            const getLocationID = await locationID(locationName);

            if (!getLocationID) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: `Location '${locationName}' not found.`,
                });
                return;
            }
			
			// Now you can proceed to edit the location with the getLocationID
			const locationResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/update/${getLocationID}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category: formState.category,
					status: formState.status,
                    widgets: formState.widgets,
				}),
			});
			
			if (!locationResponse.ok) {
				throw new Error(`Network response was not ok (status ${locationResponse.status})`);
			}

			const locationData = await locationResponse.json();
			console.log(locationData);
			
			if (locationResponse.ok) {
				Swal.fire({
					title: "Location successfully updated",
					icon: "success",
					text: `${locationName} is now updated`,
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
		<button type="button" className="btn" onClick={handleEditLocation}>
		Edit Location
		</button>
	);
};