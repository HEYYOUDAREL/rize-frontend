export async function locationID (locationName) {
    try {
        // Ensure that locationName is not undefined or null before making the request
        if (!locationName) {
            throw new Error("Location is missing or invalid");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/location/retrieve/objectId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                location: locationName, // Pass the selected location name to the server
            }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }

        const data = await response.json();
        const objectId = data.objectId; // Assuming the response includes the location's ObjectId as "objectId"

        console.log('Location name:', locationName, 'ObjectId:', objectId); // Log both locationName and objectId

        return objectId;
    } catch (error) {
        throw error;
    }
}
