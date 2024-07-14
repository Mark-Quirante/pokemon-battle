// URL of the API endpoint
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch data from the API
async function fetchData(id, pokemonName) {
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

function generatePokemonName() {
	const pokemonArray = [
		"bulbasaur",
		"ivysaur",
		"venusaur",
		"charmander",
		"charmeleon",
		"charizard",
		"squirtle",
		"wartortle",
		"blastoise",
		"caterpie",
		"metapod",
		"butterfree",
		"weedle",
		"kakuna",
		"beedrill",
		"pidgey",
		"pidgeotto",
		"pidgeot",
		"rattata",
		"raticate",
		"spearow",
		"fearow",
		"ekans",
		"arbok",
		"pikachu",
		"raichu",
		"sandshrew",
		"sandslash",
		"nidoran♀",
		"nidorina",
		"nidoqueen",
		"nidoran♂",
		"nidorino",
		"nidoking",
		"clefairy",
		"clefable",
		"vulpix",
		"ninetales",
		"jigglypuff",
		"wigglytuff",
		"zubat",
		"golbat",
		"oddish",
		"gloom",
		"vileplume",
		"paras",
		"parasect",
		"venonat",
		"venomoth",
		"diglett",
		"dugtrio",
		"meowth",
		"persian",
		"psyduck",
		"golduck",
		"mankey",
		"primeape",
		"growlithe",
		"arcanine",
		"poliwag",
		"poliwhirl",
		"poliwrath",
		"abra",
		"kadabra",
		"alakazam",
		"machop",
		"machoke",
		"machamp",
		"bellsprout",
		"weepinbell",
		"victreebel",
		"tentacool",
		"tentacruel",
		"geodude",
		"graveler",
		"golem",
		"ponyta",
		"rapidash",
		"slowpoke",
		"slowbro",
		"magnemite",
		"magneton",
		"farfetch'd",
		"doduo",
		"dodrio",
		"seel",
		"dewgong",
		"grimer",
		"muk",
		"shellder",
		"cloyster",
		"gastly",
		"haunter",
		"gengar",
		"onix",
		"drowzee",
		"hypno",
		"krabby",
		"kingler",
		"voltorb",
		"electrode",
	];
	const pokemonIndex = Math.floor(Math.random() * pokemonArray.length);
	return pokemonArray[pokemonIndex];
}

function generatePokemon() {
	const name1 = generatePokemonName();
	const name2 = generatePokemonName();

	if (name1 === name2) {
		name2 = generatePokemonName();
	}
	fetchData("pokemon1", name1);
	fetchData("pokemon2", name2);
}

const pokemonButton = document
	.getElementById("btn")
	.addEventListener("click", generatePokemon);
