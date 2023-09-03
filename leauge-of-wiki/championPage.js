document.addEventListener("DOMContentLoaded", function () {
  const championInfoElement = document.getElementById("champion-info");
  const championImageElement = document.getElementById("champion-image");
  const championImage = getQueryParam("image");

  if (championImage) {
    // Set the src attribute of the championImageElement to display the champion's image
    championImageElement.src = championImage;
    // Make the image visible by removing any "hidden" class or style
    championImageElement.classList.remove("hidden");
    // Hide the text element that displays "Champion not found."
    championInfoElement.textContent = "";
  } else {
    // If no champion image is found, display a message
    championInfoElement.textContent = "Champion image not found.";
  }
});

function getQueryParam(name) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}
