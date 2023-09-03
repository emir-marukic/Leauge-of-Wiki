const championList = document.querySelector(".championList");
const searchInput = document.querySelector("input");
let championsData = []; // Declare championsData outside the fetch block

fetch("http://ddragon.leagueoflegends.com/cdn/13.17.1/data/en_US/champion.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    championsData = Object.values(data.data);
    console.log(championsData);
    updateChampionList(""); // Pass an empty string initially to display all champions
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });

function updateChampionList(inputValue) {
  const filteredChampions = championsData.filter((champion) =>
    champion.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  championList.textContent = "";

  filteredChampions.forEach((champion) => {
    const championDiv = document.createElement("div");
    championDiv.classList.add("championBox");
    const championImg = document.createElement("img");
    championImg.classList.add("championImg");
    championImg.src = `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champion.image.full}`;

    const championName = document.createElement("p");
    championName.textContent = champion.name;

    championDiv.appendChild(championImg);
    championDiv.appendChild(championName);

    championList.appendChild(championDiv);
  });
}

// Add an event listener to the input field
searchInput.addEventListener("input", function () {
  const inputValue = this.value.trim(); // Get the trimmed input value
  updateChampionList(inputValue); // Update the displayed champion list
});
