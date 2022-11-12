export default function initEspecifico(){

}
/*valor específico*/
let segundos = document.querySelectorAll('[data-segundos]');
let minutos = document.querySelectorAll('[data-minutos]');
let inputvalue = document.querySelector('[data-numero]');
let init = document.querySelector('[data-iniciar]');
let pause = document.querySelector('[data-pausar]');
inputvalue.setAttribute('readonly','');

/*valor personalizado : modal*/
let modal = document.querySelector('.section-modal');
let modal_iniciar = document.querySelector('[data-iniciar-modal]');
let modal_hours = document.querySelector('[data-modal-horas]');
let modal_minutes = document.querySelector('[data-modal-minutos]');
let modal_seconds = document.querySelector('[data-modal-segundos]');

/* get minutes or seconds of links*/
segundos.forEach((e) => {
    e.addEventListener('click',setinput);
});
minutos.forEach((e) => {
    e.addEventListener('click',setinput);
})
function setinput(event){
    event.preventDefault();
    let texto;
    let number = 0;

    if(this.dataset.segundos === 's'){
        let texto = this.innerText.split(' ').map(Number);
        number = 0;
        texto.forEach((e) => {
            !isNaN(e) ? number = e : undefined;/*retorna false se for um numero, e com o NOT retornará true se for número */
        });
        inputvalue.value = `${number} segundo(s)`;
    }
    else if(this.dataset.minutos === 'm'){
        texto = this.innerText.split(' ').map(Number);
        number = 0;
        texto.forEach((e) => {
            !isNaN(e) ? number = e : undefined;/*retorna false se for um numero, e com o NOT retornará true se for número */
        });
        inputvalue.value = `${number} minuto(s)`;
    }
}
/* init score*/
init.addEventListener('click',initscore);
function initscore(event){
    const audio = new Audio('./audio/alarme.mp3');
    const type = inputvalue.value.split(' ');
    let texto = inputvalue.value.split(' ').map(Number);
    let number = 0;
    let numberPersonalizado = [];

    if(type.includes('segundo(s)') && !init.classList.contains('personalizado')){
        texto.forEach((e) => !isNaN(e) ? number = e : undefined);
        pause.classList.remove('ativo');
        init.setAttribute('disabled','');

        let interval = setInterval(() => {
            number > 0 ? number-- : number = 0;
            if(number === 0){
                init.removeAttribute('disabled');
                pausescoreAux(interval);//clearInterval
                audio.play();
            }
            inputvalue.value = `${number} segundo(s)`;
            pausescore(interval);
            resetscore();
        },1000);
    }
    else if(type.includes('minuto(s)') && !init.classList.contains('personalizado')){
        texto.forEach((e) => !isNaN(e) ? number = e : undefined);
        pause.classList.remove('ativo');
        init.setAttribute('disabled','');
  
        let milisegundos = 1000;
        let hour = new Date(number * 60 * milisegundos);
        let m = hour.getTime();
        
        let interval = setInterval(() => {
            if(m > 0){
                m = m - 1000; 
                hour.setSeconds(m / 1000);
                hour.setMinutes(m / (60 * 1000));   
            }
            //number > 0 ? number-- : number = 0;
            if(m <= 0){
                init.removeAttribute('disabled');
                pausescoreAux(interval);//clearInterval
                audio.play();
            }
            let textoInput = `${hour.getMinutes()} minuto(s) : ${hour.getSeconds()} segundo(s)`;
            inputvalue.value = textoInput;
            hour.getMinutes() < 10 ? inputvalue.value = `0${textoInput}` : undefined;
            pausescore(interval);
            resetscore();
        },1000);
    }

    if(this.classList.contains('personalizado') && type.includes('hora(s)')){/* tratando o tempo personalizado */
        numberPersonalizado = texto.filter((e) => {
            return !isNaN(e);
        });
        let h = numberPersonalizado[0];
        let m = numberPersonalizado[1];
        let s = numberPersonalizado[2];
        let timer = new Date((h * 3600000) + (m * 60000) + (s * 1000)); //0h 1m 1s | 1 h = 3600000 milisegunds
        let mili = timer.getTime();//pegando o valor em ms

        let interval = setInterval(() => {
            mili = mili - 1000;
            timer.setHours((mili / 3600000) % 24);//1h
            timer.setMinutes((mili / 60000) % 60);//60m
            timer.setSeconds((mili / 1000) % 60);
        
            if( mili <= 0){
                init.removeAttribute('disabled');
                pausescoreAux(interval);//clearInterval
                audio.play();
                //init.classList.remove('personalizado');//remover no fim
            }
            let textoInput = `${timer.getHours()} hora(s) : ${timer.getMinutes()} minuto(s): ${timer.getSeconds()} segundo(s)`;
            inputvalue.value = textoInput;
            pausescore(interval);
            resetscore();
        },1000);
        init.classList.remove('personalizado');//remover no fim
    }
    
}
/* pause score*/
function pausescore(intervalo){
    pause.addEventListener('click',callback);
    function callback(event){
        clearInterval(intervalo);
        event.target.classList.add('ativo');
        init.removeAttribute('disabled');
    }
}
function pausescoreAux(intervalo){
    clearInterval(intervalo);
}
/*reset score*/
function resetscore(){
    pause.addEventListener('dblclick',() => {
        inputvalue.value = 0;
    });
}
/* get value timer of modal*/
modal_iniciar.addEventListener('click',getValuesModal);
function getValuesModal(){//caso o input esteja vazio,null e undefined virarão 0 !!!!
    let h = +modal_hours.value;
    let m = +modal_minutes.value;
    let s = +modal_seconds.value;

    inputvalue.value = `${h} hora(s) : ${m} minuto(s) : ${s} segundo(s)`;
    modal.classList.remove('ativo');
    init.classList.add('personalizado');
    inputvalue.style.width = '60%';
    inputvalue.style.maxWidth = '60%';
    inputvalue.style.fontSize = '1.6rem';
    
}