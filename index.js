//fetch cat from API Server
document.addEventListener('DOMContentLoaded', function() {
let randCatBtn = document.getElementById("randCatButton");
randCatBtn.addEventListener('click', fetchCat);
document.getElementById('catCare').hidden = true;
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
        imgCats.addEventListener('click', selectAndDelete);
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
                imgCats.addEventListener('click', selectAndDelete);
                appendCatImg.appendChild(imgCats);

            })
         console.log(selectedCats)
        }
        
    }
//Sends user selected picture to the catCare Section and Deletes the pick Cat section
function selectAndDelete (e) {
    const adoptedCat = e.target;
    const sendToCatCare = document.getElementById('catCare');
    const createImgDiv = document.createElement('div');
    createImgDiv.className = 'catImg'
    createImgDiv.id = 'catImgId'
    sendToCatCare.appendChild(createImgDiv)
    createImgDiv.appendChild(adoptedCat);
    document.getElementById('pickCat').remove();
    document.getElementById('catCare').hidden = false;
}

//This Section is for the catCare div

//get the cat name value from the sumbit form and 
const nameCatForm = document.getElementById('interactWithCat')
nameCatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameCat = document.getElementById('NameTheCat').value;
    const imgOverlay = document.createElement('div');
    imgOverlay.className = 'overlay'
    const imgTextName = document.createElement('div')
    imgTextName.innerText = `Hi, my name is ${nameCat}`;
    imgTextName.className = 'text'
    const catImgForName = document.getElementById('catImgId')
    catImgForName.appendChild(imgOverlay);
    imgOverlay.appendChild(imgTextName);
    document.getElementById('interactWithCat').remove();
})

//this section will create the play section.