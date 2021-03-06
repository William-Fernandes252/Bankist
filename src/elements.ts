import $ from 'jquery';
import logoPath from './assets/img/logo.png';
import iconPath from './assets/img/icon.png';

export const labelWelcome = $('.welcome');
export const labelDate = $('.date');
export const labelBalance = $('.balance__value');
export const labelSumIn = $('.summary__value--in');
export const labelSumOut = $('.summary__value--out');
export const labelSumInterest = $('.summary__value--interest');
export const labelTimer = $('.timer');

export const containerApp = $('.app');
export const containerMovements = $('.movements');

export const btnLogin = $('.login__btn');
export const btnTransfer = $('.form__btn--transfer');
export const btnLoan = $('.form__btn--loan');
export const btnClose = $('.form__btn--close');
export const btnSort = $('.btn--sort');

export const inputLoginUsername = $('.login__input--user');
export const inputLoginPin = $('.login__input--pin');
export const inputTransferTo = $('.form__input--to');
export const inputTransferAmount = $('.form__input--amount');
export const inputLoanAmount = $('.form__input--loan-amount');
export const inputCloseUsername = $('.form__input--user');
export const inputClosePin = $('.form__input--pin');

// Insert logo on page header
labelWelcome.after(`<img src="${logoPath}" alt="Logo" class="logo" />`);

// Insert icon on page title
$('head').append(
    `<link rel="shortcut icon" type="image/png" href="${iconPath}" />`
);
