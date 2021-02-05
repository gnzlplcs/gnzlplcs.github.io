const date = new Date();
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const day1 = days[date.getDay()];
const day2 = days[date.getDay() + 1];
const day3 = days[date.getDay() + 2];
const day4 = days[date.getDay() + 3];
const day5 = days[date.getDay() + 4];
document.getElementById('day1').innerHTML = day1;
document.getElementById('day2').innerHTML = day2;
document.getElementById('day3').innerHTML = day3;
document.getElementById('day4').innerHTML = day4;
document.getElementById('day5').innerHTML = day5;

