import '../styles/index.scss';
import Inputmask from 'inputmask/dist/inputmask.es6.js';

document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');
  const phoneMask = new Inputmask('+7 (999) 999-99-99');
  phoneMask.mask(phoneInput);
});
