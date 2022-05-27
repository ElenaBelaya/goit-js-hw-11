import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchPictures} from "./fetchPictures";

const refs = {
    formEl: document.querySelector(`#search-form`),
    inputEl: document.querySelector(`input`),
    btn: document.querySelector(`button[type="submit"]`),
    galleryBox:document.querySelector(`.gallery`),

}

refs.formEl.addEventListener(`submit`, onSearch);

function onSearch(event) {
event.preventDefault();
refs.galleryBox.innerHTML = "";
const picturesName = refs.inputEl.value.trim();
    if(picturesName) {
       fetchPictures(picturesName)
        .then(renderPictures)
        .catch(error => console.log(error.message));
    }
       
};

function renderPictures(pictures) {
  console.log(pictures);
  if(pictures.hits.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }  else {
    Notify.success("Hooray! We found totalHits images.");
    const pictureList = pictures.hits.map((picture) => 
    `
    <div class="photo-card">
<img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
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
</div>
`
).join("");

refs.galleryBox.insertAdjacentHTML("beforeend", pictureList);

} 
  };
  
  
  



 