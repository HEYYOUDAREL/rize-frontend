import React, { useState } from "react";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { agencyID } from "../utils/agencyID";

export const DeleteAgency = ({ formState, defaultValue, setFormState }) => {
    
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAgencyDeletion = async () => {
        try {
            setIsDeleting(true);

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

            const agencyResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/delete/${getAgencyID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (agencyResponse.ok) {
                Swal.fire({
                    title: "Agency successfully deleted",
                    icon: "success",
                    text: `${agencyName} and all its associated locations are deleted successfully!`,
                })
                .then((result) => {
                    // Reload the Page
                    location.reload();
                });
            } else {
                throw new Error(`Network response was not ok (status ${agencyResponse.status})`);
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: `Failed to delete agency. Please try again later!`,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`btn-table ${isDeleting ? "disabled" : ""}`} onClick={!isDeleting ? handleAgencyDeletion : null}>
            <BsFillTrashFill size={30} color={isDeleting ? "gray" : "red"} />
        </div>
    );
};
