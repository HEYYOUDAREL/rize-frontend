import React, { useState } from "react";
import Select from "react-select";
import "./styles/Modal.css";
import { ClientDropdown } from "./ModalComponent/clientDropdown";
import { AgencyDropdown } from "./ModalComponent/agencyDropdown";
import { LocationDropdown } from "./ModalComponent/locationDropdown";
import { AddAgency } from "./ModalComponent/addAgency";
import { AddLocation } from "./ModalComponent/addLocation";

export const Modal = ({ closeModal, defaultValue }) => {
    const [formState, setFormState] = useState(
    defaultValue || {
        selectedClient: null,
        selectedAgency: null,
        location: "",
        category: "Reviewtrackers",
        status: "Active",
        widgets: "Active",
    }
    );
    
    const [isAddingAgency, setIsAddingAgency] = useState(false);
    const [errors, setErrors] = useState("");
    
    const handleClientSelection = async (selectedClientId) => {
        setFormState({ ...formState, selectedClient: selectedClientId });
    };
    
    const handleAgencySelection = (selectedAgencyName) => {
        setFormState({
            ...formState,
            selectedAgency: selectedAgencyName,
        });
    };
    
    const handleLocationSelection = (selectedLocationName) => {
        setFormState({
            ...formState,
            location: selectedLocationName,
        });
    };
    
    const handleCategorySelection = (selectedOption) => {
        setFormState({
            ...formState,
            category: selectedOption.value,
        });
    };
    
    const handleStatusSelection = (selectedOption) => {
        setFormState({
            ...formState,
            status: selectedOption.value,
        });
    };

    const handleWidgetsSelection = (selectedOption) => {
        setFormState({
            ...formState,
            widgets: selectedOption.value,
        });
    };
    
    return (
        <div className="modal-container">
            <div className="modal">
                <h1>Add Account</h1>
                <form>
                    <div className="form-group">
                        <p className="modal-header">Unique Client</p>
                        <ClientDropdown onClientSelect={handleClientSelection} />
                    </div>
                
                    <div className="form-group">
                        <p className="modal-header">Agency</p>
                        <AgencyDropdown
                            formState={formState}
                            onAgencySelect={handleAgencySelection}
                            setIsAddingAgency={setIsAddingAgency}
                        />
                    </div>

                    {!isAddingAgency && (
                    <div className="form-group">
                        <p className="modal-header">Location</p>
                        <LocationDropdown
                            formState={formState}
                            onLocationSelect={handleLocationSelection}
                            isAddingAgency={isAddingAgency}
                        />
                    </div>
                    )}
                
                    <div className="form-group">
                        <p className="modal-header">Category</p>
                        <Select
                            name="category"
                            onChange={handleCategorySelection}
                            value={{ value: formState.category, label: formState.category }}
                            options={[
                                { value: 'Reviewtrackers', label: 'Reviewtrackers' },
                                { value: 'Reviewshake', label: 'Reviewshake' },
                                { value: 'Rize Partner', label: 'Rize Partner' },
                                { value: 'Grade.us', label: 'Grade.us' },
                                { value: 'White Label', label: 'White Label' }
                            ]}
                        />
                    </div>
                
                    <div className="form-group status">
                        <p className="modal-header">Status</p>
                        <Select
                            name="status"
                            onChange={handleStatusSelection}
                            value={{ value: formState.status, label: formState.status }}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Trial', label: 'Trial' },
                            ]}
                        />
                    </div>

                    <div className="form-group widgets">
                        <p className="modal-header">Widgets</p>
                        <Select
                            name="widgets"
                            onChange={handleWidgetsSelection}
                            value={{ value: formState.widgets, label: formState.widgets }}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'None', label: 'None' },
                            ]}
                        />
                    </div>
                
                    {errors && <div className="error">{`Required fields: ${errors}`}</div>}
                    
                    <div className="buttons">
                        <AddAgency
                            formState={formState}
                            defaultValue={defaultValue}
                            setFormState={setFormState}
                            closeModal={closeModal}
                        />
                        <AddLocation
                            formState={formState}
                            defaultValue={defaultValue}
                            setFormState={setFormState}
                            closeModal={closeModal}
                        />
                        <button
                            type="button"
                            className="close btn"
                            onClick={() => {
                            closeModal();
                            window.location.reload(true);
                            }}
                        >Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};