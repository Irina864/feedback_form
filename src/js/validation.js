import { postAjax } from './ajaxRequests.js';
import { serverPath } from './index.js';
import { toggleModal } from './modal.js';

const form = document.forms.formFeedback;
const inputs = form.querySelectorAll('.form-item__input, .form-item__textarea');

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    removeErrorClass(input);
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
      errorElement.remove();
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const sendData = validateForm();
  if (sendData) {
    postAjax(sendData, serverPath)
      .then((response) => {
        console.log('POST response: ', response);
        if (response.status === 'success') {
          document.querySelector('.modal__text').textContent = response.msg;
          inputs.forEach((input) => {
            input.value = '';
          });
          toggleModal(e);
        }
      })
      .catch((response) => {
        console.log('POST response: ', response);
        const fields = response.fields;
        for (const key in fields) {
          const inputElement = form.elements[key];
          createNewElement(fields[key], 'div', inputElement, 'error');
          addErrorClass(inputElement);
        }
      });
  }
});

function validateForm() {
  document.querySelectorAll('.error').forEach((error) => error.remove());
  let isValid = true;
  inputs.forEach((input) => {
    if (!checkValidity(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    const sendData = {
      sender: form.elements.sender.value,
      email: form.elements.email.value,
      tel: form.elements.tel.value,
      message: form.elements.message.value,
    };
    return sendData;
  }
  return false;
}

function checkValidity(input) {
  if (input.validity.valueMissing) {
    createNewElement('Обязательное поле', 'div', input, 'error');
    addErrorClass(input);
    return false;
  }
  if (input.validity.tooShort) {
    createNewElement(
      `Минимальная длина - ${input.minLength} символов`,
      'div',
      input,
      'error'
    );
    addErrorClass(input);
    return false;
  }
  if (input.validity.tooLong) {
    createNewElement(
      `Максимальная длина - ${input.maxLength} символов`,
      'div',
      input,
      'error'
    );
    addErrorClass(input);
    return false;
  }
  if (input.validity.typeMismatch && input.type === 'email') {
    createNewElement(
      'Введите корректный адрес электронной почты',
      'div',
      input,
      'error'
    );
    addErrorClass(input);
    return false;
  }
  if (input.validity.patternMismatch && input.type === 'email') {
    createNewElement('Некорректное значение в поле', 'div', input, 'error');
    addErrorClass(input);
    return false;
  }
  if (input.validity.typeMismatch && input.type === 'tel') {
    createNewElement(
      'Введите корректный номер телефона',
      'div',
      input,
      'error'
    );
    addErrorClass(input);
    return false;
  }
  if (input.validity.patternMismatch && input.type === 'tel') {
    createNewElement('Некорректное значение в поле', 'div', input, 'error');
    addErrorClass(input);
    return false;
  }
  return true;
}

function createNewElement(content, tag, elem, classNew) {
  const newElem = document.createElement(tag);
  newElem.classList.add(classNew);
  newElem.innerHTML = content;
  elem.after(newElem);
}

function removeErrorClass(elem) {
  elem.classList.remove('error-border');
}
function addErrorClass(elem) {
  elem.classList.add('error-border');
}
