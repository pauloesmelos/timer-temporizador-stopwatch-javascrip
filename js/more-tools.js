export default function initMoreTools(){

}
let buttons = document.querySelectorAll('.button-more-tools');
let textos = document.querySelectorAll('.texto');

function setText(indice,elemento){
    buttons.forEach((e,i) =>{
        e.classList.remove('ativo');
        textos[i].classList.remove('ativo');
    });
    textos[indice].classList.add('ativo');
    elemento.classList.add('ativo');
}
buttons.forEach((e,i) => {
    e.addEventListener('click',() => {
        setText(i,e);
    });
});
/*dias até o natal*/
let date = new Date();
let christmas = new Date('Dec 24 2022 23:59').getTime();
let now = date.getTime();

function transformDay(miliseconds1,miliseconds2){//Math.floor vs Math.ceil
    const miliSecondsOf1970UntilNow = Math.floor(miliseconds1 / (24 * 60 * 60 * 1000));
    const miliSecondsOf1970UntilChristmas = Math.floor(miliseconds2 / (24 * 60 * 60 * 1000));
    return miliSecondsOf1970UntilChristmas - miliSecondsOf1970UntilNow;
}
const addedDayUntilChristmas = document.querySelector('.day-until');
addedDayUntilChristmas.innerHTML =  transformDay(now,christmas);

/*horário brasília*/
let textBrasiliaTime = document.querySelector('.br-time');
let brasiliaTimeHour = date.getUTCHours() - 3;
let brasiliaTimeMinutes = date.getUTCMinutes();
let h = [24,23,22,21,20];
function addedBrasiliaTime(){
    if(brasiliaTimeHour < 0){
        brasiliaTimeHour = h[brasiliaTimeHour * -1];
    }
    textBrasiliaTime.innerHTML = `${brasiliaTimeHour} horas : ${brasiliaTimeMinutes} minutos`;
    
}
addedBrasiliaTime();

/*horário máquina*/
let textPcTime = document.querySelector('.pc-time');
function addedPcTime(){
    return `${date.getHours()} horas : ${date.getMinutes()} minutos`;
}
textPcTime.innerHTML = addedPcTime();
