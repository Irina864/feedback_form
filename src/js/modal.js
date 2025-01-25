const modalButton = document.querySelectorAll('.modal__btn');
const modal = document.querySelector('.overlay');

modalButton.forEach((btn) => {
  btn.addEventListener('click', toggleModal);
});

export function toggleModal(e) {
  e.preventDefault();
  modal.classList.toggle('overlay_active');
  document.body.classList.toggle('modal-open');
}
