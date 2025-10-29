// Inside your frontend file (e.g., App.js)

async function fetchLearningData() {
    // The exact URL of the endpoint we created in Step 1.4
    const API_ENDPOINT = 'http://localhost:8080/api/data'; 

    try {
        console.log("Fetching data from backend...");

        // 1. Send the request to the backend
        const response = await fetch(API_ENDPOINT);

        // 2. Check if the server responded okay (e.g., status 200)
        if (!response.ok) {
            // If status is 404, 500, etc., show an error
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // 3. Convert the response from the server into a readable JavaScript object (JSON)
        const data = await response.json();

        console.log('Data successfully received:', data.message);
        console.log('Courses:', data.stockData);

        // --- 4. USE THE DATA TO UPDATE YOUR FRONTEND VIEW ---
        // Example: If you are using React, you would call a state update function here:
        // setCourses(data.stockData);

        // Example for plain JS: Update an HTML element
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            statusElement.textContent = `Backend Connection: SUCCESS! Message: ${data.message}`;
        }

    } catch (error) {
        console.error("ERROR: Could not connect to backend!", error);
        // This is where you would get a CORS error if Step 1.4 was missed!
    }
}

// Call the function when your frontend loads (e.g., in a React useEffect or on page load)
fetchLearningData();