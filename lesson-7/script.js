let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    }
};

imagesToLoad.forEach((img) => {
    loadImages(img);
})  

// Intersection Observer 
if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if(item.isIntersecting) {
                loadImages(items.target) ;  
                observer.unobserve(item.target);
            }
        });
    });
}

imagesToLoad.forEach((img) => {
    observer.observe(img);
}) else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}