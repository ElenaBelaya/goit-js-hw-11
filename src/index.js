import SimpleLightbox from "simplelightbox";
import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewFetchPictures from "./fetchPictures";

const refs = {
    formEl: document.querySelector(`#search-form`),
    inputEl: document.querySelector(`input`),
    btn: document.querySelector(`button[type="submit"]`),
    galleryBox:document.querySelector(`.gallery`),
    btnAddMore: document.querySelector(`button[type="button"]`),
    btnScroll: document.querySelector(`.scroll`),
}

const newFetchPictures = new NewFetchPictures();

refs.formEl.addEventListener(`submit`, onSearch);
refs.galleryBox.addEventListener(`click`, onViewingStart);
refs.btnAddMore.addEventListener(`click`, onAddMore);
refs.btnScroll.addEventListener(`click`, scrollByBtn);

let cardHeight = 0;

async function onSearch(event) {
event.preventDefault();
removeActiveClassOnBtn();
refs.galleryBox.innerHTML = "";
newFetchPictures.searchQuery = event.currentTarget.elements.searchQuery.value;
newFetchPictures.resetPage();
if(newFetchPictures.searchQuery) {
  try{
    const pictures = await newFetchPictures.fetchPictures();
    renderPictures(pictures); 
   
    //scrollByBtn();
  }
   catch(error) {
    console.log(error.message);
     }       
   } 
 };

async function onAddMore() { 
  try {   
    const pictures = await newFetchPictures.fetchPictures();
    renderPictures(pictures); 
    //scrollByBtn();
    
  }   
  catch(error) {
    console.log(error.message);
  } 
};

function renderPictures(pictures) {

  if(pictures.hits.length === 0) {    
    removeActiveClassOnBtn();
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }  else {
    Notify.success(`Hooray! We found totalHits ${pictures.total} images.`);
    const pictureList = pictures.hits.map((picture) => 
     `     
    <a class="photo-card" href="${picture.largeImageURL}">
    <img src=${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />      
<div class="info">
 <p class="info-item">
   <b>Likes</b>${picture.likes}
 </p>
 <p class="info-item">
   <b>Views</b>${picture.views}
 </p>
 <p class="info-item">
   <b>Comments</b>${picture.comments}
 </p>
 <p class="info-item">
   <b>Downloads</b>${picture.downloads}
 </p>
</div>
</a>  
`
).join("");

refs.galleryBox.insertAdjacentHTML("beforeend", pictureList);

if(newFetchPictures.page <= Math.ceil(pictures.total / 40)) {
  addActiveClassOnBtn();  
} else {
  removeActiveClassOnBtn();
   Notify.failure("We're sorry, but you've reached the end of search results."); 
}
     } 
  };

  function addActiveClassOnBtn() {
    refs.btnAddMore.classList.add(`active`);
    refs.btnScroll.classList.add(`active`);
    gallery.refresh(); 
  };

  function removeActiveClassOnBtn() {
    refs.btnAddMore.classList.remove(`active`);
  }; 
  
  let gallery = new SimpleLightbox('.gallery a');

  function onViewingStart(event) {    
    gallery.on('show.simplelightbox')  
};


function scrollByBtn() { 
  const { height: cardHeight } = refs.galleryBox.firstElementChild
  .getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 3,
    left: 0,
    behavior: "smooth",
  })
  };
  



 



 