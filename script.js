// URL of the API endpoint
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch data from the API
async function fetchPokemon(pokemonName, side) {
	try {
		const response = await fetch(apiUrl + pokemonName); // Make the API request

		if (!response.ok) {
			// Check if the request was successful
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json(); // Parse the JSON response
		console.log(data); // Do something with the data

		const imgURL = data.sprites.front_default;
		const pokemonNameLabel = data.name;
		const pokemonStatHpNum = data.stats[0].base_stat;
		const pokemonStatAtkNum = data.stats[1].base_stat;
		const pokemonStatDefNum = data.stats[2].base_stat;
		const pokemonStatSpatkNum = data.stats[3].base_stat;
		const pokemonStatSpdefNum = data.stats[4].base_stat;
		const pokemonStatSpeedNum = data.stats[5].base_stat;

		// Example: Update the DOM with the fetched data
		const imageContainer = document.getElementById("pokemon-image-" + side);
		imageContainer.src = imgURL;
		imageContainer.alt = data.name;

		const nameContainer = document.getElementById("pokemon-name-" + side);
		nameContainer.innerText = pokemonNameLabel;

		const statContainerHpNum = document.getElementById(
			"pokemon-hp-num-" + side
		);
		statContainerHpNum.innerText = pokemonStatHpNum;

		const statContainerAtkNum = document.getElementById(
			"pokemon-atk-num-" + side
		);
		statContainerAtkNum.innerText = pokemonStatAtkNum;

		const statContainerDefNum = document.getElementById(
			"pokemon-def-num-" + side
		);
		statContainerDefNum.innerText = pokemonStatDefNum;

		const statContainerSpatkNum = document.getElementById(
			"pokemon-spatk-num-" + side
		);
		statContainerSpatkNum.innerText = pokemonStatSpatkNum;

		const statContainerSpdefNum = document.getElementById(
			"pokemon-spdef-num-" + side
		);
		statContainerSpdefNum.innerText = pokemonStatSpdefNum;

		const statContainerSpeedNum = document.getElementById(
			"pokemon-speed-num-" + side
		);
		statContainerSpeedNum.innerText = pokemonStatSpeedNum;
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
		fetchPokemon(pokemonName[0], "left");
		fetchPokemon(pokemonName[1], "right");
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
