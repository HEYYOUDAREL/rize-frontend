export async function clientID (clientName) {
    try {
        // Ensure that clientName is not undefined or null before making the request
        if (!clientName) {
            throw new Error("Client name is missing or invalid");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/client/retrieve/objectId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client: clientName, // Pass the selected client name to the server
            }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }

        const data = await response.json();
        const objectId = data.objectId; // Assuming the response includes the client's ObjectId as "objectId"

        console.log('Client name:', clientName, 'ObjectId:', objectId); // Log both clientName and objectId

        return objectId;
    } catch (error) {
        throw error;
    }
}
