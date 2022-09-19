//fetch cat from API Server
let randCatBtn = document.getElementById("randCatButton");
randCatBtn.addEventListener('click', fetchCat);


function fetchCat() {
    fetch("https://cataas.com/api/cats")
  .then(resp => resp.json())
  .then((json) => renderCat(json));

}

function renderCat(cats) {
    console.log(cats)
 
}

// document.addEventListener('DOMContentLoaded', function() {
//   fetchBooks();
//   console.log("DOM loaded")
// });