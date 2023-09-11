const urlParams = new URLSearchParams(window.location.search);
const championName = urlParams.get("name");
const boxImg = document.querySelector(".img-box");

// const championTitleUrl = urlParams.get("title");

// const championTitle = document.createElement("p");
// championTitle.textContent = championTitleUrl;
// Display the champion name (optional)
const championNameElement = document.createElement("p");
championNameElement.textContent = championName;
document.body.appendChild(championNameElement);
console.log(championName);
// Fetch and display the champion image
fetch(
  `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${championName}.png`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob();
  })
  .then((imageBlob) => {
    const imageURL = URL.createObjectURL(imageBlob);
    const championImageElement = document.createElement("img");
    championImageElement.src = imageURL;
    championImageElement.alt = `${championName} Image`;

    boxImg.appendChild(championImageElement);
    boxImg.append(championNameElement);
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });
