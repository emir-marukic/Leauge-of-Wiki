const championList = document.querySelector(".championList");
const searchInput = document.querySelector("input");
let championsData = [];

searchInput.blur();

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
    updateChampionList("", championList);
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });

function updateChampionList(inputValue, championList) {
  const filteredChampions = championsData.filter((champion) =>
    champion.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  championList.textContent = "";

  filteredChampions.forEach((champion) => {
    const championDiv = document.createElement("div");
    championDiv.classList.add("championBox");

    const championLink = document.createElement("a");
    championLink.href = `championPage.html?name=${champion.id}&title=${champion.title}`; // Include the champion's title in the query parameters

    championLink.classList.add("championLink");

    const championImg = document.createElement("img");
    championImg.classList.add("championImg");
    championImg.src = `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champion.image.full}`;

    const championName = document.createElement("p");
    championName.textContent = champion.name;

    championLink.appendChild(championImg);
    championLink.appendChild(championName);

    championDiv.appendChild(championLink);

    championList.appendChild(championDiv);
  });
}

searchInput.addEventListener("input", function () {
  const inputValue = this.value.trim();
  updateChampionList(inputValue, championList);
});
