import React, { useState } from "react";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { locationID } from "../utils/locationID";

export const DeleteLocation = ({ formState, defaultValue, setFormState }) => {
    
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLocationDeletion = async () => {
        try {
            setIsDeleting(true);

            const locationName = formState.selectedLocation;
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

            const locationResponse = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/delete/${getLocationID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (locationResponse.ok) {
                Swal.fire({
                    title: "Location successfully deleted",
                    icon: "success",
                    text: `${locationName} is deleted successfully!`,
                })
                .then((result) => {
                    // Reload the Page
                    location.reload();
                });
            } else {
                throw new Error(`Network response was not ok (status ${locationResponse.status})`);
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: `Failed to delete location. Please try again later!`,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`btn-table ${isDeleting ? "disabled" : ""}`} onClick={!isDeleting ? handleLocationDeletion : null}>
            <BsFillTrashFill size={30} color={isDeleting ? "gray" : "red"} />
        </div>
    );
};
