//fetch cat from API Server
document.addEventListener('DOMContentLoaded', function() {
let renderCatBtn = document.getElementById("renderCatButton");
renderCatBtn.addEventListener('click', fetchCat);
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
    //console.log('JSONObj', cats);
    //console.log('Selected Value', selectTag);
    if (selectTag === 'See All Cats') {
    cats.forEach(cats => {
    const imgCats = document.createElement('img');
        imgCats.src = `https://cataas.com/cat/${cats.id}`;
        imgCats.id = `${cats.id}`
        imgCats.addEventListener('click', selectAndDelete);
        appendCatImg.appendChild(imgCats);

    })}
   //renders cat images by tag 
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
         //console.log('filtered cats', selectedCats)
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

//get the cat name value from the sumbit form, delete the submit form and unhide the interactive section
const nameCatForm = document.getElementById('NameCat')
nameCatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameCat = document.getElementById('NameTheCat').value;
    const imgOverlay = document.createElement('div');
    imgOverlay.className = 'middle'
    const imgTextName = document.createElement('div')
    imgTextName.innerText = `Hi, my name is ${nameCat}`;
    imgTextName.className = 'text'
    const catImgForName = document.getElementById('catImgId')
    catImgForName.appendChild(imgOverlay);
    imgOverlay.appendChild(imgTextName);
    document.getElementById('NameCat').remove();
    document.getElementById('interactWithCat').hidden = false;
})

//this section will create the play section.
submitCatGamesBtn = document.getElementById('getThisGame')
submitCatGamesBtn.addEventListener('click', loadGame);

function loadGame(e) {
    document.querySelector('.middle').style.visibility = 'hidden';
    //console.log(hideName);
    
    const pickGame = document.getElementById('catGames').value
    console.log(pickGame)
    if (pickGame === 'playWithCat'){
        playWithCat()
    }
}
    function playWithCat() {
        const inputImage = document.getElementById("catImgId").querySelector('img');
        const outputImage = document.createElement('canvas');
        outputImage.width = inputImage.naturalWidth;
        outputImage.height = inputImage.naturalHeight;
        outputImage.id = 'reverseImg';
        outputImage.hidden = true;
        const ctx = outputImage.getContext('2d');
        ctx.scale(-1, 1);
        ctx.drawImage(inputImage, -outputImage.width, 0);
        document.getElementById('playWithCat').appendChild(outputImage);
    window.addEventListener("keydown", toggleCat);
    }

    function toggleCat(e) { 
        console.log(e.key)
    
        if ( e.key === 'ArrowRight') { 
            document.getElementById('catImgId').hidden = true;
            document.getElementById('reverseImg').hidden = false;
        }
        
        else if (e.key === 'ArrowLeft') {
            document.getElementById('reverseImg').hidden = true;
            document.getElementById('catImgId').hidden = false;
        }
    }

