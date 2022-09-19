//fetch cat from API Server
document.addEventListener('DOMContentLoaded', function() {
let randCatBtn = document.getElementById("randCatButton");
randCatBtn.addEventListener('click', fetchCat);
fetchCatTags();
});

//Functions for fetching API information and rendering it to the DOM
function fetchCat() {
    fetch("https://cataas.com/api/cats")
  .then(resp => resp.json())
  .then((json) => renderCat(json));

}

function fetchCatTags() {
    fetch("https://cataas.com/api/tags")
    .then(resp => resp.json())
    .then((json) => renderForm(json))
}

function renderCat(cats) {
    appendCatImg = document.getElementById('pickCat')
    cats.forEach(cats => {
        const imgCats = document.createElement('img');
        imgCats.src = `https://cataas.com/cat/${cats.id}`;
        appendCatImg.appendChild(imgCats);
    })
}

function renderForm(tags) {
    const catTagsSelect = document.getElementById('catTags');
    tags.forEach(tags=>{
        const catOption = document.createElement('option');
        catOption.value = `${tags}`;
        catOption.textContent = `${tags}`;
        catTagsSelect.appendChild(catOption);
    })
}

// document.addEventListener('DOMContentLoaded', function() {
//   
// });