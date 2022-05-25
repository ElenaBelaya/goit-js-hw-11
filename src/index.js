import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    formEl: document.querySelector(`#search-form`),
    inputEl: document.querySelector(`input`),
    btn: document.querySelector(`button[type="submit"]`),
}

//console.log(refs.formEl);
//console.log(refs.inputEl);
//console.log(refs.btn);

//refs.formEl.addEventListener(`submit`, onSuccess);
//refs.inputEl.addEventListener(`blur`, onSuccess);
refs.formEl.addEventListener(`click`, onSuccess);

function onSuccess(event) {
event.preventDefault();
    Notify.success("Hooray! We found totalHits images.");
    console.log('hello');
};
//Notify.success("Hooray! We found totalHits images.");
