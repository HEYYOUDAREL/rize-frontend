import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { clientID } from "../utils/clientID";
import { agencyID } from "../utils/agencyID";

export const LocationDropdown = ({ formState, onLocationSelect, isAddingAgency }) => {
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!formState || !formState.selectedClient || !formState.selectedAgency || isAddingAgency) {
        // Handle the case where selectedClient, selectedAgency, or isAddingAgency is not available or when a new agency is being added
        return;
      }

      try {
        const clientName = formState.selectedClient;
        const getClientID = await clientID(clientName);

        const agencyName = formState.selectedAgency;
        const getAgencyID = await agencyID(agencyName);

        if (!getClientID || !getAgencyID) {
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/${getAgencyID}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok (status ${response.status})`);
        }

        const data = await response.json();

        const agencyLocations = data.locations.map((locationData) => ({
          label: locationData.location,
          value: locationData.location,
        }));

        // Sort the location alphabetically by label
				const sortedLocations = agencyLocations.sort((a, b) => a.label.localeCompare(b.label));
        setAllLocations(sortedLocations);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchLocations();
  }, [formState.selectedClient, formState.selectedAgency, isAddingAgency]);

  const handleSelectChange = (selectedOption) => {
    setSelectedLocation(selectedOption);

    if (selectedOption) {
      onLocationSelect(selectedOption.value);
    }
  };

  const createLocationName = (inputValue) => {
    const newOption = {
      label: inputValue,
      value: inputValue,
    };

    setSelectedLocation(newOption);
    onLocationSelect(newOption.value);
  };

  return (
    <CreatableSelect
      value={selectedLocation}
      onChange={handleSelectChange}
      options={allLocations}
      isClearable
      isSearchable
      onCreateOption={createLocationName}
      placeholder="Enter Location Name"
    />
  );
};