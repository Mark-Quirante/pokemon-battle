// URL of the API endpoint
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch data from the API
async function fetchPokemonImage(id, pokemonName) {
	try {
		const response = await fetch(apiUrl + pokemonName); // Make the API request

		if (!response.ok) {
			// Check if the request was successful
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json(); // Parse the JSON response
		console.log(data); // Do something with the data

		const imgURL = data.sprites.front_default;

		// Example: Update the DOM with the fetched data
		const dataContainer = document.getElementById(id);
		dataContainer.src = imgURL;
		dataContainer.alt = data.name;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

const apiUrlNames = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=500";
async function generatePokemonName() {
	try {
		const response = await fetch(apiUrlNames);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);

		const pokemonArray = data.results;

		const pokemonIndex = Math.floor(Math.random() * pokemonArray.length);
		let pokemonIndex2 = Math.floor(Math.random() * pokemonArray.length);

		const pokemonNameLeft = pokemonArray[pokemonIndex].name;
		let pokemonNameRight = pokemonArray[pokemonIndex2].name;

		while (pokemonNameLeft === pokemonNameRight) {
			pokemonIndex2 = Math.floor(Math.random() * pokemonArray.length);
			pokemonNameRight = pokemonArray[pokemonIndex2].name;
		}
		return [pokemonNameLeft, pokemonNameRight];
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

async function setPokemon() {
	try {
		const pokemonName = await generatePokemonName();
		fetchPokemonImage("pokemon-image-left", pokemonName[0]);
		fetchPokemonImage("pokemon-image-right", pokemonName[1]);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

const pokemonButton = document
	.getElementById("btn")
	.addEventListener("click", setPokemon);

const pokemonContainer = document.getElementById("pokemon-container");

// Hide the pokemon container
// pokemonContainer.style.display = 'none';
