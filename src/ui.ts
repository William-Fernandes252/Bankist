import * as data from './data';
import * as elements from './elements';
import * as utils from './utils';

let timer: NodeJS.Timer;

export function displayMovements(
    account: Account,
    conteiner: JQuery<HTMLElement>,
    sort: boolean = false
) {
    conteiner.html('');

    const movementsToDisplay = sort
        ? account.movements.slice().sort((a, b) => a.value - b.value)
        : account.movements;

    movementsToDisplay.forEach((mov, i) => {
        const type = mov.value > 0 ? 'deposit' : 'withdraw';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}
            </div>
            <div class="movements__date"><time>${utils.formatDatetime(
                mov.date,
                account.locale
            )}</time></div>
            <div class="movements__value">${utils.formatCurrency(
                mov.value,
                account.locale,
                account.currency
            )}</div>
        </div>
        `;
        conteiner.prepend(html);
    });
}

export function displaySummary(
    account: Account,
    inLabel: JQuery<HTMLElement>,
    outLabel: JQuery<HTMLElement>,
    interestLabel: JQuery<HTMLElement>
) {
    const incomes = data.calcIncomesSum(account.movements);
    inLabel.text(
        utils.formatCurrency(incomes, account.locale, account.currency)
    );

    const out = data.calcWitdrawalsSum(account.movements);
    outLabel.text(utils.formatCurrency(out, account.locale, account.currency));

    const interest = data.calcInterestSum(account);
    interestLabel.text(
        utils.formatCurrency(interest, account.locale, account.currency)
    );
}

export function displayBalance(account: Account, label: JQuery<HTMLElement>) {
    const balance = data.calcBalance(account);
    label.text(utils.formatCurrency(balance, account.locale, account.currency));
}

export function update(account: Account) {
    displayMovements(account, elements.containerMovements);
    displayBalance(account, elements.labelBalance);
    displaySummary(
        account,
        elements.labelSumIn,
        elements.labelSumOut,
        elements.labelSumInterest
    );
}

export function logout() {
    elements.containerMovements.html('');
    elements.labelSumIn.text('');
    elements.labelSumOut.text('');
    elements.labelSumInterest.text('');
    elements.labelWelcome.text('');
    elements.labelDate.text('');
    elements.containerApp.css('opacity', 0);
}

function startLogOutTimer(labelTimer: JQuery<HTMLElement>) {
    let time = 600; /* 10 minutes */
    const tick = () => {
        const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        labelTimer.text(`${minutes}:${seconds}`);

        if (time === 0) {
            clearInterval(timer);
            logout();
        }

        time--;
    };

    tick();
    const logoutTimer = setInterval(tick, 1000);

    return logoutTimer;
}

export function loginAccount(): Account | undefined {
    const account = data.accounts.find(
        account => account.username === elements.inputLoginUsername.val()
    );
    const pin = elements.inputLoginPin.val();
    utils.clearFields(elements.inputLoginUsername, elements.inputLoginPin);

    if (account && account.pin === pin) {
        const datetime = utils.formatDatetime(new Date(), account.locale, {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        // Display UI and message
        elements.labelWelcome.html(
            `Welcome back, <b>${account.owner.split(' ').at(0)}</b>`
        );
        elements.labelDate.html(datetime);
        elements.containerApp.css('opacity', 1);

        // Display account data
        update(account);

        // Set logout timer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer(elements.labelTimer);

        return account;
    }
}

export function makeTransfer(payer: Account): boolean {
    const amount = Number(elements.inputTransferAmount.val());
    const receiver = data.accounts.find(
        account => account.username === elements.inputTransferTo.val()
    );
    utils.clearFields(elements.inputTransferAmount, elements.inputTransferTo);

    if (
        receiver &&
        payer.balance &&
        amount > 0 &&
        payer.balance >= amount &&
        receiver.username !== payer.username
    ) {
        return data.transfer(payer, receiver, amount);
    }

    clearInterval(timer);
    timer = startLogOutTimer(elements.labelTimer);

    return false;
}

export function closeAccount(account: Account | undefined): boolean {
    const username = elements.inputCloseUsername.val();
    const pin = elements.inputClosePin.val();
    utils.clearFields(elements.inputCloseUsername, elements.inputClosePin);

    if (account && account.pin === pin && account.username === username) {
        data.accounts.splice(
            data.accounts.findIndex(
                account => account.username === username && account.pin === pin
            )
        );
        return true;
    }

    return false;
}

export function requestLoan(account: Account | undefined): boolean {
    const amount = Number(elements.inputLoanAmount.val());
    utils.clearFields(elements.inputLoanAmount);

    if (
        account &&
        amount > 0 &&
        account.movements.some(movement => movement.value >= amount * 0.1)
    ) {
        account.movements.push({ value: amount, date: new Date() });
        return true;
    }

    clearInterval(timer);
    timer = startLogOutTimer(elements.labelTimer);

    return false;
}

elements.containerApp.on({
    click: () => {
        clearInterval(timer);
        timer = startLogOutTimer(elements.labelTimer);
    },
});
