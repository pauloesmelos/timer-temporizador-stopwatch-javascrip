export default function initModal(){

}
const btnModal = document.querySelector('[data-novo]');
const btnModalClose = document.querySelector('[data-fecharmodal]');
const btnModalCancel = document.querySelector('[data-cancelarmodal]');
let modal = document.querySelector('.section-modal');
const events = ['click','touchstart','onclick'];

events.forEach(e => btnModal.addEventListener(e,openmodal));
function openmodal(){
    modal.classList.add('ativo');
}
events.forEach((e) => {
    btnModalClose.addEventListener(e,closemodal);
    btnModalCancel.addEventListener(e,closemodal);
});
function closemodal(){
    modal.classList.remove('ativo');
}