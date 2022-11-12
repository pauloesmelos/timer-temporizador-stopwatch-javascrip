export default function initDetails(){

}
let details = document.querySelector('.help');
let texto = document.querySelector('.help-text');
let span = texto.children[0];

details.addEventListener('click',callback);
function callback(event){
    details.classList.toggle('ativo');
    if(event.target === texto || event.target === span){
        details.removeAttribute('open');
    }
    
}
