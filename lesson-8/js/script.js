
// -------------DATE---------------

let myData = new Date(document.lastModified);
let lastModified = `${myData.getMonth() + 1}.${myData.getDate()}.${myData.getFullYear()}`;
document.getElementById('date').innerText = lastModified;
