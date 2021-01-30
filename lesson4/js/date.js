const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDate = new Date()
let result = weekdays[currentDate.getDay()] + ", " + months[currentDate.getMonth()] + " " + currentDate.getDate() + ", "  + currentDate.getFullYear();
document.getElementById('lastUpdate').innerHTML = result;