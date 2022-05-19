import * as elements from './elements';
import * as ui from './ui';
import './assets/style/main.scss';

let currentAccount: Account | undefined;

// Login
elements.btnLogin.on({
    click: event => {
        event.preventDefault();
        currentAccount = ui.loginAccount();
    },
});

// Transferences
elements.btnTransfer.on({
    click: event => {
        event.preventDefault();
        if (currentAccount && ui.makeTransfer(currentAccount)) {
            /* Simulate longer processing of the transfer. */
            setTimeout(() => currentAccount && ui.update(currentAccount), 1000);
        }
    },
});

// Accounts closing
elements.btnClose.on({
    click: event => {
        event.preventDefault();
        if (ui.closeAccount(currentAccount)) ui.logout();
    },
});

// Loan requests
elements.btnLoan.on({
    click: event => {
        event.preventDefault();
        if (currentAccount && ui.requestLoan(currentAccount)) {
            /* Simulate longer processing of the loan request. */
            setTimeout(() => currentAccount && ui.update(currentAccount), 2500);
        }
    },
});

// Sort movements
let sorted = false;
elements.btnSort.on({
    click: () => {
        if (currentAccount) {
            ui.displayMovements(
                currentAccount,
                elements.containerMovements,
                !sorted
            );
            sorted = !sorted;
        }
    },
});
