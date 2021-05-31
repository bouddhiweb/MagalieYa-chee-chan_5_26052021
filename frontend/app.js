import Photo from "./classes/Cards.js";

fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response=>response.json())
    .then(photos=>{
        const offset = 0;
        const limit = 20;
        photos = photos.slice(offset, limit);
        photos.forEach(photoData => {
            const photo = new Photo(photoData);
            photo.display();
        })
    })
