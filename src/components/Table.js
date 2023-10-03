import React, { useState } from "react";
import "./styles/Table.css";
import { BsPersonAdd } from "react-icons/bs";
import { Modal } from "./Modal";
import { ClientDropdown } from "./TableComponent/clientDropdown";
import { AgencyDropdown } from "./TableComponent/agencyDropdown";
import { LocationDropdown } from "./TableComponent/locationDropdown";
import { AgencyCategory } from "./TableComponent/agencyCategory";
import { AgencyStatus } from "./TableComponent/agencyStatus";
import { LocationCategory } from "./TableComponent/locationCategory";
import { LocationStatus } from "./TableComponent/locationStatus";
import { DeleteClient } from "./TableComponent/deleteClient";

export const Table = ({ defaultValue }) => {
    
    const [formState, setFormState] = useState(
        defaultValue || {
            selectedClient: null,
            selectedAgency: null,
            selectedLocation: "",
            category: "",
            status: "",
        }
        );
        
        const [modalOpen, setModalOpen] = useState(false);
        const [deleteConfirmation, setDeleteConfirmation] = useState(false);
        // Add a state variable to control the key prop
        const [dropdownKey, setDropdownKey] = useState(0);
        
        // Function to reload dropdowns
        const reloadDropdowns = () => {
            console.log("Reloading dropdowns...");
            setDropdownKey((prevKey) => prevKey + 1);
        };
        
        const handleClientSelection = (selectedClientId) => {
            setFormState({ ...formState, selectedClient: selectedClientId });
        };
        
        const handleAgencySelection = (selectedAgencyId) => {
            setFormState({
                ...formState,
                selectedAgency: selectedAgencyId,
            });
        };
        
        const handleLocationSelection = (selectedLocationName) => {
            setFormState({
                ...formState,
                selectedLocation: selectedLocationName,
            });
        };
        
        const clearFormFields = () => {
            setFormState({
                selectedClient: "",
                selectedAgency: "",
                selectedLocation: "",
                category: "",
                status: "",
            });
        };
        
    const statusText = (status) => status.charAt(0).toUpperCase() + status.slice(1);
    
    return (
        <div className="table-wrapper">
            <table>
                <tbody>
                    <tr>
                        <td className="th-component">Unique Client</td>
                    </tr>
                    <tr >
                        <td>
                            <div className="dropdown-container">
                            <ClientDropdown
                                formState={formState}
                                onClientSelect={handleClientSelection}
                            />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="th-component">Agency</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="dropdown-container">
                            <AgencyDropdown
                                formState={formState}
                                onAgencySelect={handleAgencySelection}
                            />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="th-component">Location</td>
                    </tr>

                    <tr>
                        <td>
                            <div className="dropdown-container">
                            <LocationDropdown
                                formState={formState}
                                onLocationSelect={handleLocationSelection}
                            />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="th-component">Category</td>
                    </tr>

                    <tr>
                        <td>
                            <div className="dropdown-container centered-cell">
                                {!formState.selectedLocation || formState.selectedLocation === "" ? (
                                <AgencyCategory formState={formState} />
                                ) : (
                                <LocationCategory formState={formState} />
                                )}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="th-component">Status</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="dropdown-container centered-cell">
                                {!formState.selectedLocation || formState.selectedLocation === "" ? (
                                    <AgencyStatus formState={formState} />
                                ) : (
                                <LocationStatus formState={formState} />
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <button onClick={() => setModalOpen(true)} className="btn-table add" title="Add">
                                <BsPersonAdd size={30} />
                                </button>
                                {modalOpen && (
                                    <Modal
                                        closeModal={() => setModalOpen(false)}
                                    />
                                )}
                                <button onClick={() => setDeleteConfirmation(true)} className="btn-table" title="Delete">
                                    <DeleteClient
                                        formState={formState}
                                        defaultValue={defaultValue}
                                        setFormState={setFormState}
                                        reloadDropdowns={reloadDropdowns}
                                        onConfirm={() => {
                                            clearFormFields();
                                        }}
                                    />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
                            