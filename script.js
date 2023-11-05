const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImage = 0;

let photosArray = [];

// Unsplash API
const count = 40;
const apiKey = '6IR3pKGzp_a0XlqtfJReoXl665yALuh44OvRo1Tk4zo';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images were loaded
function imagesLoaded() {
    console.log("image loaded");
    imagesLoaded++ ;
    if (imagesLoaded == totalImage){
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready);
    }
}

// create elements for links and photos and add to DOM
function displayPhotos() {
    imagesLoaded = 0; 
    totalImage = photosArray.length;
    console.log("total images", totalImage);
    //  run functions for each object in photoArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        // create <img> for photo
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt". photo.alt_description);
        img.setAttribute("title". photo.alt_description);
        // Event listner, check when each is finished loading
        img.addEventListener ("load", imagesLoaded);
        // put <img> inside <a> then put both inside an imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    
    


    });
}
// Get photos from Unsplash  API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();


        

    }catch (error) {
        // catch error Here
    }
}    

// check to see if scrolling near the bottom of page, load more photos
window.addEventListener("scroll",() => {
    if (window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
getPhotos(); 
    }
})

// Onload
getPhotos();
