export default class NewFetchPictures {
constructor() {
  this.picturesName = '';
  this.page = 1;
}
 
fetchPictures() {
 
    return fetch(`https://pixabay.com/api/?key=27675363-36ea1c192b15f6a71011fab08&q=${this.picturesName}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
    .then(response => response.json())
    .then((data) => {
     this.page +=1;
     return data;
                
 });
}

 get searchQuery() {
     return this.picturesName;
 }

 set searchQuery(newsearchQuery) {
   this.picturesName = newsearchQuery;
 }

 resetPage() {
   this.page = 1;
 }

}
