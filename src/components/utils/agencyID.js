export async function agencyID (agencyName) {
    try {
        // Ensure that agencyName is not undefined or null before making the request
        if (!agencyName) {
            throw new Error("Agency is missing or invalid");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/agency/retrieve/objectId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agency: agencyName, // Pass the selected agency name to the server
            }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }

        const data = await response.json();
        const objectId = data.objectId; // Assuming the response includes the agency's ObjectId as "objectId"

        console.log('Agency name:', agencyName, 'ObjectId:', objectId); // Log both agencyName and objectId

        return objectId;
    } catch (error) {
        throw error;
    }
}
