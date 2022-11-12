export default function initDropdown(){
    
}
let dropdown = document.querySelector('[data-dropdown]');
let html = document.documentElement;
let events = ['click','onclick','touchstart'];

events.forEach((e) => {
    dropdown.addEventListener(e,callback);
    html.addEventListener(e,clickOutside);
});
function callback(event){
    if(this.children[0] === event.target)
        dropdown.classList.toggle('ativo');
}

function clickOutside(event){
    if(!dropdown.contains(event.target))
        dropdown.classList.remove('ativo');
}