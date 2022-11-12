export default function initTrocarBackground(){

}
const fa_moon = document.querySelector('.fa-moon');
const menu_nav = document.querySelector('.menu-nav');
const footer = document.querySelector('.footer');
const especify_time = document.querySelectorAll('.block');
const inputTime = document.querySelector('[data-numero]');
const body = document.body;
const firsth1 = document.querySelector('h1');
const events = ['click','touchstart','onclick'];

events.forEach((e) => {
    fa_moon.addEventListener(e,changeBackground);
});
function changeBackground(){
    menu_nav.classList.toggle('dark');
    footer.classList.toggle('dark');
    //body.style.backgroundColor = '#555';
    body.classList.toggle('dark');
    especify_time.forEach( e => e.classList.toggle('dark'));
    inputTime.classList.toggle('dark');
    inputTime.classList.contains('dark') ? firsth1.style.color = '#fff' : firsth1.style.removeProperty('color');
}