export default function initTooltip(){

}
let target = document.querySelector('.fa-moon');
target.addEventListener('mouseover',callback);
function callback(event){
    let elemento = createBox();
    const topo =  event.clientY;
    const left = event.clientX;
    console.log(left);

    elemento.style.position = 'absolute';
    elemento.style.top = topo + 50 + 'px';
    elemento.style.left = left + (-50) + 'px';

    leave.div = elemento;
    leave.eventIcon = this;
    this.addEventListener('mouseleave',leave);
}

function createBox(){
    let div = document.createElement('div');
    div.innerText = 'Ativar o modo noturno';
    div.classList.add('tooltip');
    document.body.appendChild(div);
    return div;
}

const leave = {
    handleEvent(){
        this.div.remove();
        this.eventIcon.removeEventListener('mouseleave',leave);
    }
}