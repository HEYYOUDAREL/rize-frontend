import Swal from "sweetalert2";

export const AddClient = (clientName, allClients, setAllClients, setSelectedClient) => {
  if (!clientName) {
    // Display a specific error message for an empty client name
    Swal.fire({
      title: "Error!",
      icon: "error",
      text: "Client is required.",
    });
    return; // Prevent the request from being sent
  }

  // Send the clientName to the server
  fetch(`${process.env.REACT_APP_API_URL}/accounts/client/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client: clientName,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok (status ${res.status})`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data && data.message === "Client added successfully!") {
        const addedClientName = data.data.client || clientName;
        // Client added successfully
        Swal.fire({
          title: "Client successfully Added",
          icon: "success",
          text: `${addedClientName} is now added`,
        });

        // Add the new client to the list of options and sort them
        const updatedClients = [...allClients, { label: addedClientName, value: addedClientName }];
        const sortedClients = updatedClients.sort((a, b) => a.label.localeCompare(b.label));
        setAllClients(sortedClients);
      } else {
        // Handle server-side error messages
        const errorMessage = data && data.message ? data.message : "Something went wrong. Please try again later!";
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: errorMessage,
        });
      }
    })
    .catch((error) => {
      // Handle network errors or other unexpected issues
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Something went wrong. Please try again later!",
      });
    });
};
