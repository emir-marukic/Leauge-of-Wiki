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

      // Create a div element to hold the champion's image and name
      const championDiv = document.createElement("div");
      championDiv.classList.add("championBox");
      // Create an img element for the champion's image
      const championImg = document.createElement("img");
      championImg.classList.add("championImg");
      championImg.src = `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champion.image.full}`;

      // Create a paragraph element for the champion's name
      const championName = document.createElement("p");
      championName.textContent = champion.name;

      // Append the image and name elements to the div
      championDiv.appendChild(championImg);
      championDiv.appendChild(championName);

      // Append the div to the championList container
      championList.appendChild(championDiv);

      console.log(championDiv);
    }
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });
