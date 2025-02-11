// URL of the API endpoint
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokemonLoaded = {
  left: false,
  right: false,
  pokeLoadTimeoutLeft: null,
  pokeLoadTimeoutRight: null,
};

// Function to fetch data from the API
async function fetchPokemon(pokemonName, side) {
  try {
    pokemonLoaded.left = false;
    pokemonLoaded.right = false;
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
    fetchPokemon(pokemonName, side);
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
    showLoserPokemonContainer(pokemonContainerVisibilityLeft);
    showLoserPokemonContainer(pokemonContainerVisibilityRight);

    await setTimeout(() => {
      fetchPokemon(pokemonName[0], "left");
      fetchPokemon(pokemonName[1], "right");
    }, 500);

    // want this to come in
    if (pokemonContainer.style.display !== "flex") {
      pokemonContainer.style.display = "flex";
      pokemonContainer.classList.add("grow-in");

      document.getElementById("vs").classList.add("slide-fade-in-from-bottom");
    }

    winnerBoxDisplay.classList.remove("shrink-out-before");
    winnerBoxDisplay.classList.add("shrink-out-after");

    generatePokemonButton.classList.remove("shrink-out-before");
    generatePokemonButton.classList.add("shrink-out-after");
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

//Winner box displaying pokemon winner
const winnerBoxDisplay = document.getElementById("winner-box");

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

// Event Listeners for image loading
const pokemonImageLeft = document.getElementById("pokemon-image-left");
const pokemonAboutLeft = document.getElementById("pokemon-about-left");
const pokemonLoadLeft = document.getElementById("poke-load-left");
pokemonImageLeft.addEventListener("load", function () {
  setTimeout(() => {
    pokemonImageLeft.classList.remove("poke-img-hide");
    pokemonImageLeft.classList.add("poke-img-show");

    pokemonAboutLeft.classList.remove("slide-in-hide");
    pokemonAboutLeft.classList.add("slide-in-show");

    const timeoutKey = "pokeLoadTimeoutLeft";
    if (pokemonLoaded[timeoutKey] != null) {
      clearTimeout(pokemonLoaded[timeoutKey]);
    }

    pokemonLoadLeft.classList.remove("poke-img-show");
    pokemonLoadLeft.classList.remove("poke-ball-twitch-left");
    pokemonLoadLeft.classList.add("poke-img-hide");

    pokemonLoaded.left = true;
    if (pokemonLoaded.left && pokemonLoaded.right) {
      whoWinsButton.classList.remove("shrink-out-after");
      whoWinsButton.classList.add("shrink-out-before");
    }
  }, 2000);
});

const pokemonImageRight = document.getElementById("pokemon-image-right");
const pokemonAboutRight = document.getElementById("pokemon-about-right");
const pokemonLoadRight = document.getElementById("poke-load-right");
pokemonImageRight.addEventListener("load", function () {
  setTimeout(() => {
    pokemonImageRight.classList.remove("poke-img-hide");
    pokemonImageRight.classList.add("poke-img-show");

    pokemonAboutRight.classList.remove("slide-in-hide");
    pokemonAboutRight.classList.add("slide-in-show");

    const timeoutKey = "pokeLoadTimeoutRight";
    if (pokemonLoaded[timeoutKey] != null) {
      clearTimeout(pokemonLoaded[timeoutKey]);
    }

    pokemonLoadRight.classList.remove("poke-img-show");
    pokemonLoadRight.classList.remove("poke-ball-twitch-right");
    pokemonLoadRight.classList.add("poke-img-hide");

    pokemonLoaded.right = true;
    if (pokemonLoaded.left && pokemonLoaded.right) {
      whoWinsButton.classList.remove("shrink-out-after");
      whoWinsButton.classList.add("shrink-out-before");
    }
  }, 2000);
});

//Hiding Loser pokemon container
function hideLoserPokemonContainer(loser) {
  // Poke Image Animation
  const pokeImg = loser.querySelector(".poke-img");
  pokeImg.classList.remove("poke-img-show");
  pokeImg.classList.add("poke-img-hide");

  const pokeAbout = loser.querySelector(".pokemon-about");
  pokeAbout.classList.remove("slide-in-show");
  pokeAbout.classList.add("slide-in-hide");
}

//Displaying loser pokemon container from last battle
function showLoserPokemonContainer(loser) {
  const idSplit = loser.id.split("-");
  const side = idSplit[idSplit.length - 1];

  // Poke Image Animation
  const pokeImg = loser.querySelector(".poke-img");
  pokeImg.classList.remove("poke-img-show");
  pokeImg.classList.add("poke-img-hide");

  const timeoutKey = `pokeLoadTimeout${
    side.charAt(0).toUpperCase() + side.slice(1)
  }`;

  if (pokemonLoaded[timeoutKey] != null) {
    clearTimeout(pokemonLoaded[timeoutKey]);
  }

  pokemonLoaded[timeoutKey] = setTimeout(() => {
    const pokeLoader = loser.querySelector(".poke-load");
    pokeLoader.classList.remove("poke-img-hide");
    pokeLoader.classList.add("poke-img-show");
    pokeLoader.classList.add("poke-ball-twitch-" + side);
  }, 200);

  const pokeAbout = loser.querySelector(".pokemon-about");
  pokeAbout.classList.remove("slide-in-show");
  pokeAbout.classList.add("slide-in-hide");
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

  const pokemoneCompareDefenseValue = 1.5;

  const pokemonLeftWinnerName =
    document.getElementById("pokemon-name-left").innerHTML;
  const pokemonRightWinnerName =
    document.getElementById("pokemon-name-right").innerHTML;
  const pokemonTieWinnerName = "Everyone";

  if (pokemonAtkNumLeft > pokemonAtkNumRight) {
    if (pokemonAtkNumLeft / pokemoneCompareDefenseValue < pokemonDefNumRight) {
      winnerBoxDisplayName(pokemonRightWinnerName);
      hideLoserPokemonContainer(pokemonContainerVisibilityLeft);
    } else {
      winnerBoxDisplayName(pokemonLeftWinnerName);
      hideLoserPokemonContainer(pokemonContainerVisibilityRight);
    }
  } else if (pokemonAtkNumLeft < pokemonAtkNumRight) {
    if (pokemonAtkNumRight / pokemoneCompareDefenseValue < pokemonDefNumLeft) {
      winnerBoxDisplayName(pokemonLeftWinnerName);
      hideLoserPokemonContainer(pokemonContainerVisibilityRight);
    } else {
      winnerBoxDisplayName(pokemonRightWinnerName);
      hideLoserPokemonContainer(pokemonContainerVisibilityLeft);
    }
  } else {
    winnerBoxDisplayName(pokemonTieWinnerName);
  }

  winnerBoxDisplay.classList.remove("shrink-out-after");
  winnerBoxDisplay.classList.add("shrink-out-before");

  //Switching out which buttons will appear
  generatePokemonButton.classList.remove("shrink-out-after");
  generatePokemonButton.classList.add("shrink-out-before");
  generatePokemonButton.innerText = "Regenerate Pokémon";

  whoWinsButton.classList.remove("shrinnk-out-after");
  whoWinsButton.classList.add("shrink-out-after");
}
