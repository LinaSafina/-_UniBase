const STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
};
const inputIds = [
  'organization-name',
  'tel-number',
  'e-mail',
  'field',
  'logo',
  'site',
  'vk',
  'ok',
  'facebook',
  'instagram',
  'youtube',
  'director',
];
const urls = ['vk', 'ok', 'facebook', 'instagram', 'youtube'];

const cancelBtn = document.querySelector('#btn-cancel');
const submitBtn = document.querySelector('#btn-submit');
const joinBtn = document.querySelector('#btn-join');
const modal = document.querySelector('#modal');
const form = document.forms.form;
const logoInput = document.querySelector('#logo');
const logoImg = document.querySelector('#logo-img');
const logoCloseBtn = document.querySelector('#logo-close-btn');

let error = {};

validateFormOnChange();

joinBtn.addEventListener('click', toggleModalHandler);
cancelBtn.addEventListener('click', toggleModalHandler);
submitBtn.addEventListener('submit', formSubmitHandler);
logoInput.addEventListener('change', uploadImageHandler);
logoCloseBtn.addEventListener('click', cancelLogoUploadHandler);

function uploadImageHandler() {
  readUrl(this);
}

function cancelLogoUploadHandler() {
  logoImg.style.backgroundImage = '';
}

function readUrl(event) {
  if (event.files && event.files[0]) {
    let reader = new FileReader();
    reader.onload = (event) =>
      (logoImg.style.backgroundImage = `url(${event.target.result})`);
    reader.readAsDataURL(event.files[0]);
  }
}

function toggleModalHandler() {
  modal.classList.toggle('hidden');
}

function formSubmitHandler(event) {
  event.preventDefault();
  console.log(form);
  toggleModalHandler();
}

function phoneFormat(input) {
  input = input.replace(/\D/g, '');
  input = input.substring(0, 11);

  const size = input.length;

  if (size == 0) {
    input = input;
  } else if (size === 1) {
    input = '+' + input;
  } else if (size <= 4) {
    input = '+' + input.substring(0, 1) + ' ' + input.substring(1);
  } else if (size <= 7) {
    input =
      '+' +
      input.substring(0, 1) +
      ' ' +
      input.substring(1, 4) +
      ' ' +
      input.substring(4);
  } else if (size <= 9) {
    input =
      '+' +
      input.substring(0, 1) +
      ' ' +
      input.substring(1, 4) +
      ' ' +
      input.substring(4, 7) +
      '-' +
      input.substring(7);
  } else {
    input =
      '+' +
      input.substring(0, 1) +
      ' ' +
      input.substring(1, 4) +
      ' ' +
      input.substring(4, 7) +
      '-' +
      input.substring(7, 9) +
      '-' +
      input.substring(9);
  }
  return input;
}

// Form Validation
function validateFormOnChange(e) {
  inputIds.forEach((id) => {
    const input = document.querySelector(`#${id}`);

    if (input.hasAttribute('required')) {
      error[id] = STATUS.ERROR;
    } else {
      error[id] = STATUS.SUCCESS;
    }

    input.addEventListener('input', (event) => {
      validateInput(input);
    });

    input.addEventListener('change', (event) => {
      validateInput(input);
      addErrorStyles(id, input);
    });
  });
}

function isFormValid() {
  let result = true;

  for (let inputId in error) {
    result = result && error[inputId] === STATUS.SUCCESS;
  }

  result
    ? submitBtn.removeAttribute('disabled')
    : submitBtn.setAttribute('disabled', true);
}

function validateInput(input) {
  let { id, value, type } = input;

  if (value.trim().length < 3 && input.hasAttribute('required')) {
    error[id] = STATUS.ERROR;
  } else {
    error[id] = STATUS.SUCCESS;
  }

  if (type === 'email') {
    const regExp = /\S+@\S+\.\S+/;

    if (regExp.test(value)) {
      error[id] = STATUS.SUCCESS;
    } else {
      error[id] = STATUS.ERROR;
    }
  }

  if (type === 'tel') {
    value = phoneFormat(value);

    if (value.length === 16) {
      error[id] = STATUS.SUCCESS;
    } else {
      error[id] = STATUS.ERROR;
    }
  }

  if (type === 'url' && id !== 'site') {
    const regExp = new RegExp(`${id}\.com\/\\w+`);

    if (value.trim().length) {
      if (regExp.test(value)) {
        error[id] = STATUS.SUCCESS;
      } else {
        error[id] = STATUS.ERROR;
      }
    }
  }

  if (type === 'url' && id === 'site') {
    const regExp = /\w+\.com|\.ru/;

    if (value.trim().length) {
      if (regExp.test(value)) {
        error[id] = STATUS.SUCCESS;
      } else {
        error[id] = STATUS.ERROR;
      }
    }
  }

  isFormValid();
}

function addErrorStyles(inputId, input) {
  if (error[inputId] === STATUS.ERROR) {
    input.style.borderColor = 'red';
  } else {
    input.style.borderColor = '#d6dade';
  }
}
