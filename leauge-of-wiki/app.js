const championList = document.querySelector(".championList");

fetch("http://ddragon.leagueoflegends.com/cdn/13.17.1/data/en_US/champion.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.data);
    const championsData = data.data;

    for (const champion of Object.values(championsData)) {
      console.log(champion);

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

      console.log(championDiv);
    }
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });
