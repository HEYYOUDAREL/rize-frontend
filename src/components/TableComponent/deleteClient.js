import React, { useState } from "react";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { clientID } from "../utils/clientID";

export const DeleteClient = ({ formState, defaultValue, setFormState }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClientDeletion = async () => {
        try {
            setIsDeleting(true);

            const clientName = formState.selectedClient;
            if (!clientName) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Client is required.",
                });
                return;
            }

            const getClientID = await clientID(clientName);

            if (!getClientID) {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: `Client '${clientName}' not found.`,
                });
                return;
            }

            const clientResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/delete/${getClientID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (clientResponse.ok) {
                Swal.fire({
                    title: "Client successfully deleted",
                    icon: "success",
                    text: `${clientName} and all its associated agencies/locations are deleted successfully!`,
                })
                .then((result) => {
                    // Reload the Page
                    window.location.reload();
                });
            } else {
                throw new Error(`Network response was not ok (status ${clientResponse.status})`);
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: `Failed to delete client. Please try again later!`,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`btn-table ${isDeleting ? "disabled" : ""}`} onClick={!isDeleting ? handleClientDeletion : null}>
            <BsFillTrashFill size={30} color={isDeleting ? "gray" : "red"} />
        </div>
    );
};