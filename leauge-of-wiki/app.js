const championList = document.querySelector(".championList");
const searchInput = document.querySelector("input");
let championsData = [];

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
    updateChampionList("", championList); // Pass championList as an argument
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });

function updateChampionList(inputValue, championList) {
  // Add championList as a parameter
  const filteredChampions = championsData.filter((champion) =>
    champion.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  championList.textContent = "";

  filteredChampions.forEach((champion) => {
    const championDiv = document.createElement("div");
    championDiv.classList.add("championBox");

    // Create an anchor element with an href and target attribute
    const championLink = document.createElement("a");
    championLink.href = `championPage.html?name=${champion.name}`; // Set the destination page with a query parameter
    championLink.target = "_blank"; // Opens the link in a new tab or window
    championLink.classList.add("championLink");
    const championImg = document.createElement("img");
    championImg.classList.add("championImg");
    championImg.src = `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champion.image.full}`;

    const championName = document.createElement("p");
    championName.textContent = champion.name;

    // Append the champion image and name to the anchor element
    championLink.appendChild(championImg);
    championLink.appendChild(championName);

    // Append the anchor element to the championDiv
    championDiv.appendChild(championLink);

    // Add a click event listener to the championDiv for redirection (not needed for _blank target)
    // championDiv.addEventListener("click", function (e) {
    //   // Prevent the default behavior of the anchor link (page navigation)
    //   e.preventDefault();

    //   // Redirect to the championPage.html with the champion's name as a query parameter
    //   window.location.href = `championPage.html?name=${champion.name}`;
    // });

    // Append the championDiv to the championList
    championList.appendChild(championDiv);
  });
}

searchInput.addEventListener("input", function () {
  const inputValue = this.value.trim();
  updateChampionList(inputValue, championList); // Pass championList as an argument
});
