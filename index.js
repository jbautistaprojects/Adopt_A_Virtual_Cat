//fetch cat from API Server
document.addEventListener('DOMContentLoaded', function() {
let randCatBtn = document.getElementById("randCatButton");
randCatBtn.addEventListener('click', fetchCat);
fetchCatTags();
});

//Functions for fetching API information and rendering it to the DOM
function fetchCatTags() {
    fetch("https://cataas.com/api/tags")
    .then(resp => resp.json())
    .then((json) => renderForm(json))
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



function fetchCat() {
    fetch("https://cataas.com/api/cats")
  .then(resp => resp.json())
  .then((json) => renderCat(json));
}

//This function renders cat pics to the DOM and allows the user to filter by tags set to the cats by the API
function renderCat(cats) {
    appendCatImg = document.getElementById('pickCat')
    const selectTag = document.getElementById('catTags').value;
    console.log(cats);
    if (selectTag === 'See All Cats') {
    cats.forEach(cats => {
    const imgCats = document.createElement('img');
        imgCats.src = `https://cataas.com/cat/${cats.id}`;
        imgCats.id = `${cats.id}`
        appendCatImg.appendChild(imgCats);
    })}
    else {
         let selectedCats = 
         cats.filter(cat => {
            return cat.tags.includes('cute');

         })
         selectedCats.forEach(selectedCats => {
            const imgCats = document.createElement('img');
                imgCats.id = selectedCats.id
                imgCats.src = `https://cataas.com/cat/${selectedCats.id}`;
                appendCatImg.appendChild(imgCats);

            })
         console.log(selectedCats)
        }
        
    }

//function select&Delete () {

//}