//export const BASE_URL = 'https://restcountries.com/v3.1';
export function fetchPictures(picturesName) {
    return  fetch(`https://pixabay.com/api/?key=27675363-36ea1c192b15f6a71011fab08&q=${picturesName}s&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
        return response.json();
     });
    
 };