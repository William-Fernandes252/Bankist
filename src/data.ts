export const account1: Account = {
    owner: 'William Fernandes',
    username: 'wf',
    movements: [
        { value: 200, date: new Date(2021, 10, 18) },
        { value: 455.23, date: new Date(2021, 11, 23) },
        { value: -306.5, date: new Date(2021, 11, 25) },
        { value: 2500, date: new Date(2021, 11, 27) },
        { value: -642.21, date: new Date(2021, 11, 28) },
        { value: -133.9, date: new Date(2021, 11, 30) },
        { value: -49.99, date: new Date(2021, 11, 31) },
    ],
    locale: 'pt-BR',
    interestRate: 1.2,
    pin: '1111',
    balance: undefined,
    currency: 'BRL',
};

export const account2: Account = {
    owner: 'Jessica Davis',
    username: 'jd',
    movements: [
        { value: 5000, date: new Date(2021, 10, 16) },
        { value: 3400, date: new Date(2021, 11, 17) },
        { value: -150, date: new Date(2021, 11, 20) },
        { value: -790, date: new Date(2021, 11, 21) },
        { value: -3210, date: new Date(2021, 11, 22) },
        { value: -1000, date: new Date(2021, 11, 24) },
        { value: 8500, date: new Date(2021, 11, 25) },
        { value: -30, date: new Date(2021, 11, 28) },
    ],
    locale: 'en-US',
    interestRate: 1.5,
    pin: '2222',
    balance: undefined,
    currency: 'USD',
};

export const account3: Account = {
    owner: 'Elizabeth Olsen',
    username: 'eo',
    movements: [
        { value: 4500, date: new Date(2022, 4, 16) },
        { value: -400, date: new Date(2022, 4, 17) },
        { value: -150, date: new Date(2022, 4, 20) },
        { value: 90, date: new Date(2022, 4, 21) },
        { value: -10, date: new Date(2022, 4, 22) },
        { value: -100, date: new Date(2022, 4, 24) },
        { value: 500, date: new Date(2022, 4, 25) },
        { value: -30, date: new Date(2022, 4, 28) },
    ],
    locale: 'en-GB',
    interestRate: 1.25,
    pin: '3014',
    balance: undefined,
    currency: 'GBR',
};

export const accounts: Array<Account> = [account1, account2];

export const currencies: Map<string, string> = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

export function calcIncomesSum(movements: Array<movement>) {
    return movements
        .filter(movement => movement.value > 0)
        .reduce((acc, movement) => acc + movement.value, 0);
}

export function calcWitdrawalsSum(movements: Array<movement>) {
    return movements
        .filter(movement => movement.value < 0)
        .map(movement => Math.abs(movement.value))
        .reduce((acc, value) => acc + value, 0);
}

export function calcInterestSum(account: Account, minInterest: number = 1) {
    return account.movements
        .filter(movement => movement.value > 0)
        .map(deposit => (deposit.value * account.interestRate) / 100)
        .filter(value => value > minInterest)
        .reduce((acc, movement) => acc + movement);
}

export function calcBalance(account: Account) {
    account.balance = account.movements.reduce(
        (balance, movement) => balance + movement.value,
        0
    );
    return account.balance;
}

export function transfer(
    payer: Account,
    receiver: Account,
    amount: number
): boolean {
    payer.movements.push({ value: -amount, date: new Date() });
    receiver.movements.push({ value: amount, date: new Date() });
    return true;
}

function compUsernames(accounts: Account[]) {
    accounts.forEach(account => {
        account.username = account.owner
            .toLocaleLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
}
