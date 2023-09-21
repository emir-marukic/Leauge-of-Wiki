const urlParams = new URLSearchParams(window.location.search);

const championName = urlParams.get("name");
const boxImg = document.querySelector(".img-box");
const title = urlParams.get("title");

// const championTitleUrl = urlParams.get("title");

// const championTitle = document.createElement("p");
// championTitle.textContent = championTitleUrl;
// Display the champion name (optional)
const championNameElement = document.createElement("p");
championNameElement.textContent = championName;
document.body.appendChild(championNameElement);
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

    const newDiv = document.createElement("div");
    newDiv.classList.add("title-box");

    const paragraph = document.createElement("p");
    paragraph.classList.add("title");
    paragraph.textContent = title;

    championImageElement.src = imageURL;
    championImageElement.alt = `${championName} Image`;

    boxImg.appendChild(championImageElement);
    boxImg.append(newDiv);

    newDiv.append(championNameElement);
    newDiv.append(paragraph);

    paragraph.style.fontSize = "20px";
    paragraph.style.color = "gray";
  })
  .catch((error) => {
    console.log("Fetch error", error);
  });
