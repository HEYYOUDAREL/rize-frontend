import React from "react";
import Swal from "sweetalert2";
import { clientID } from "../utils/clientID";
import { agencyID } from "../utils/agencyID";

export const AddLocation = ({ formState, defaultValue, setFormState, closeModal }) => {
  
    const handleAddLocation = async () => {
  
      try {
  
        const clientName = formState.selectedClient;
        const agencyName = formState.selectedAgency;
        const locationName = formState.location;
    
        if (!clientName || !agencyName) {
          // Display a specific error message for missing client or agency names
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Both client and agency names are required.",
          });
          return; // Exit the function to prevent further execution
        }
  
        const getClientID = await clientID(clientName);
        const getAgencyID = await agencyID(agencyName);
  
        const locationResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: getClientID,
            agency: getAgencyID,
            location: locationName,
            category: formState.category,
            status: formState.status,
            widgets: formState.widgets,
            notes: formState.notes
          }),
        });
  
        if (!locationResponse.ok) {
          throw new Error(`Network response was not ok (status ${locationResponse.status})`);
        }
  
        const locationData = await locationResponse.json();
        console.log(locationData);
  
        if (locationData.message && locationData.message === 'Location already exists.') {
          // Display the error message from the backend.
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: locationData.message,
          });
          return;
        } else {
          Swal.fire({
            title: "Location successfully added",
            icon: "success",
            text: `${locationName} is now added`,
          }).then(() => {
            // Reload the page after the SweetAlert success message
            window.location.reload();
          });
        }
      } catch (error) {
        console.error("Error:", error);
        // Display a general error message for unexpected errors
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Something went wrong. Please try again later!",
        });
      }
  
    // Reset selectedClient, selectedAgency, and location to their default values
    setFormState((prevState) => {
      const newState = {
        ...prevState,
        selectedClient: defaultValue.selectedClient !== undefined ? defaultValue.selectedClient : null,
        selectedAgency: defaultValue.selectedAgency !== undefined ? defaultValue.selectedAgency : null,
        location: defaultValue.location !== undefined ? defaultValue.location : "",
      };
      return newState;
    });
  
      // Close the modal
      closeModal();
    };
  
  return (
    <button type="button" className="btn" onClick={handleAddLocation}>
      Add Location
    </button>
  );
};