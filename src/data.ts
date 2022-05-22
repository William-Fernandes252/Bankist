import * as models from './models';

const account1 = new models.Account(
    'William Fernandes',
    'wf',
    1.2,
    '1111',
    'BRL'
)
    .deposit(200)
    .deposit(455.23)
    .withdraw(306.5)
    .deposit(2500.0)
    .withdraw(642.21)
    .withdraw(133.9)
    .withdraw(49.99);

const account2 = new models.Account('Jesica Davis', 'jd', 1.5, '2222', 'USD')
    .deposit(5000.0)
    .deposit(3400.0)
    .withdraw(150.0)
    .withdraw(790.0)
    .withdraw(3210)
    .withdraw(1000)
    .deposit(8500.0)
    .withdraw(30);

const account3 = new models.Account(
    'Elizabeth Olsen',
    'eo',
    1.25,
    '3014',
    'GBP'
)
    .deposit(4500)
    .withdraw(400)
    .withdraw(150)
    .deposit(90)
    .withdraw(10)
    .withdraw(100)
    .deposit(500)
    .withdraw(30);

const accounts: Array<models.Account> = [account1, account2, account3];

export default accounts;

export const currencies: Map<string, string> = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
