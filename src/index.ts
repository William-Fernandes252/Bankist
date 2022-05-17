import * as elements from './elements';
import './assets/style/main.scss';
import logoPath from './assets/img/logo.png';
import iconPath from './assets/img/icon.png';

// Insert logo on page header
elements.labelWelcome.after(
    `<img src="${logoPath}" alt="Logo" class="logo" />`
);

// Insert icon on page title
$('head').append(
    `<link rel="shortcut icon" type="image/png" href="${iconPath}" />`
);
