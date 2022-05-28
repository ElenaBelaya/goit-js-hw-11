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
}

const newFetchPictures = new NewFetchPictures();

refs.formEl.addEventListener(`submit`, onSearch);
refs.galleryBox.addEventListener(`click`, onViewingStart);
refs.btnAddMore.addEventListener(`click`, onAddMore);

function onSearch(event) {
event.preventDefault();
refs.galleryBox.innerHTML = "";
newFetchPictures.searchQuery = event.currentTarget.elements.searchQuery.value;
newFetchPictures.resetPage();
if(newFetchPictures.searchQuery) {
newFetchPictures.fetchPictures().then(renderPictures)
   .catch(error => console.log(error.message));
   refs.btnAddMore.classList.add(`active`);
   }  

};

function onAddMore() {  
  newFetchPictures.fetchPictures().then(renderPictures)
  .catch(error => console.log(error.message));
};
  

function renderPictures(pictures) {
console.log(pictures);
  if(pictures.hits.length === 0) {
    refs.btnAddMore.classList.remove(`active`);
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }  else {
    Notify.success(`Hooray! We found totalHits ${pictures.total} images.`);
    const pictureList = pictures.hits.map((picture) => 
     `     
    <a class="photo-card" href="${picture.largeImageURL}">
    <img src=${picture.webformatURL}" alt="${picture.tags}" title="${picture.tags}" loading="lazy" />      
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

} 
  };
  
  let gallery = new SimpleLightbox('.gallery a',{captionsData: "alt"}); 
  

function onViewingStart(event) {  
  
  gallery.on('show.simplelightbox'); 
  //console.log(`hello`); 
  gallery.refresh(); 
};



 



 