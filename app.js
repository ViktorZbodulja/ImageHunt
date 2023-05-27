const auth = "95AaFQdzWQPxPVHmfwzcO04nLrEakh44Hlv7EbIZaqFo4gj2xQodfbMY";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search_input");
const form = document.querySelector(".search_form");
let searchValue;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.map((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery_img");
    galleryImg.innerHTML = `<img src=${photo.src.large} /> 
                            <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
}
async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15`
  );
  generatePictures(data);
}
curatedPhotos();
