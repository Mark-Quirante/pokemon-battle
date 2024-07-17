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

		const imgURL = data.sprites.other.showdown.front_default;
		const pokemonNameLabel =
			data.name.charAt(0).toUpperCase() + data.name.slice(1);
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

		//Displays name of pokemon
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

const pokemonContainer = document.getElementById("pokemon-container");
pokemonContainer.style.display = "none";

async function setPokemon() {
	try {
		const pokemonName = await generatePokemonName();
		fetchPokemon(pokemonName[0], "left");
		fetchPokemon(pokemonName[1], "right");
		pokemonContainer.style.display = "flex";
		generatePokemonButton.style.display = "none";
		winnerBoxDisplay.style.display = "none";
		whoWinsButton.style.display = "block";
		showLoserPokemonContainer(pokemonContainerVisibilityLeft);
		showLoserPokemonContainer(pokemonContainerVisibilityRight);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

//Generate Random Pokemon button
const generatePokemonButton = document.getElementById("generate-btn");
generatePokemonButton.addEventListener("click", setPokemon);

//Who Wins Button
const whoWinsButton = document.getElementById("who-wins-btn");
whoWinsButton.addEventListener("click", win);

whoWinsButton.style.display = "none";

//Winner box displaying pokemon winner
const winnerBoxDisplay = document.getElementById("winner-box");
winnerBoxDisplay.style.display = "none";

function winnerBoxDisplayName(winner) {
	const winnerBoxDisplayName = document.getElementById("winner-box");
	winnerBoxDisplayName.innerText = winner + " wins!";
	return winnerBoxDisplayName;
}

const pokemonContainerVisibilityLeft = document.getElementById(
	"pokemon-container-left"
);
const pokemonContainerVisibilityRight = document.getElementById(
	"pokemon-container-right"
);

//Hiding Loser pokemon container
function hideLoserPokemonContainer(loser) {
	loser.style.visibility = "hidden";
}

//Displaying loser pokemon container from last battle
function showLoserPokemonContainer(loser) {
	loser.style.visibility = "visible";
}

function win() {
	//Variables that contain attack values
	const pokemonAtkNumLeft = document.getElementById(
		"pokemon-atk-num-left"
	).innerHTML;
	const pokemonAtkNumRight = document.getElementById(
		"pokemon-atk-num-right"
	).innerHTML;

	//Variables that contain defense values
	const pokemonDefNumLeft = document.getElementById(
		"pokemon-def-num-left"
	).innerHTML;
	const pokemonDefNumRight = document.getElementById(
		"pokemon-def-num-right"
	).innerHTML;

	const pokemoneCompareDefenseValue = 1.3;

	const pokemonHpNumLeft = document.getElementById(
		"pokemon-hp-num-left"
	).innerHTML;
	const pokemonHpNumRight = document.getElementById(
		"pokemon-hp-num-right"
	).innerHTML;

	const pokemonLeftWinnerName =
		document.getElementById("pokemon-name-left").innerHTML;
	const pokemonRightWinnerName =
		document.getElementById("pokemon-name-right").innerHTML;
	const pokemonTieOutcome = "No One";

	// winnerBoxDisplayName(pokemonRightWinnerName);
	// winnerBoxDisplayName(pokemonLeftWinnerName);
	// winnerBoxDisplayName(pokemonTieOutcome);
	// hideLoserPokemonContainer(pokemonContainerVisibilityLeft);
	// hideLoserPokemonContainer(pokemonContainerVisibilityRight);

	if (
		pokemonAtkNumLeft > pokemonAtkNumRight ||
		(pokemonAtkNumLeft / pokemoneCompareDefenseValue > pokemonDefNumRight &&
			pokemonAtkNumLeft > pokemonHpNumRight)
	) {
		winnerBoxDisplayName(pokemonLeftWinnerName);
		hideLoserPokemonContainer(pokemonContainerVisibilityRight);
	} else if (
		pokemonAtkNumRight > pokemonAtkNumLeft ||
		(pokemonAtkNumRight / pokemoneCompareDefenseValue > pokemonDefNumLeft &&
			pokemonAtkNumRight > pokemonHpNumLeft)
	) {
		winnerBoxDisplayName(pokemonRightWinnerName);
		hideLoserPokemonContainer(pokemonContainerVisibilityLeft);
	} else {
		winnerBoxDisplayName(pokemonTieOutcome);
	}

	//Switching out which buttons will appear
	generatePokemonButton.style.display = "block";
	winnerBoxDisplay.style.display = "block";
	generatePokemonButton.innerText = "Regenerate Pokémon";
	whoWinsButton.style.display = "none";
}
