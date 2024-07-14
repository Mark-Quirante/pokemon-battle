// URL of the API endpoint
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch data from the API
async function fetchData() {
	try {
		const response = await fetch(apiUrl + generatePokemon()); // Make the API request

		if (!response.ok) {
			// Check if the request was successful
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json(); // Parse the JSON response
		console.log(data); // Do something with the data

		const imgURL = data.sprites.front_default;
		// Example: Update the DOM with the fetched data
		const dataContainer = document.getElementById("pokemon");

		dataContainer.src = imgURL;
		dataContainer.alt = data.name;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

function generatePokemon() {
	const pokemonArray = ["charizard", "pikachu", "blastoise"];
	const pokemonIndex = Math.floor(Math.random() * pokemonArray.length);
	return pokemonArray[pokemonIndex];
}

// Call the fetchData function to initiate the request
fetchData();
