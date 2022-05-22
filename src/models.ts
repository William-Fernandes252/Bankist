export class Movement implements Bankist.IMovement {
    _value: number;
    _date: Date;

    constructor(value: number) {
        this._value = value;
        this._date = new Date();
    }

    get value(): number {
        return this._value;
    }
    get date(): Date {
        return this._date;
    }
}

export class Account implements Bankist.IAccount {
    #owner: string;
    #interestRate: number;
    #movements: Array<Movement> = [];
    #username: string;
    #pin: string;
    #currency: string;
    #locale: string = navigator.language;
    #balance: number = 0;

    constructor(
        owner: string,
        username: string,
        interestRate: number,
        pin: string,
        currency: string
    ) {
        this.#owner = owner;
        this.#username = username;
        this.#interestRate = interestRate;
        this.#pin = pin;
        this.#currency = currency;
    }

    get owner() {
        return this.#owner;
    }
    get username(): string {
        return this.#username;
    }
    get pin(): string {
        return this.#pin;
    }
    get locale(): string {
        return this.#locale;
    }
    get currency(): string {
        return this.#locale;
    }
    get movements(): Array<Movement> {
        return this.#movements;
    }
    get balance(): number {
        return this.#balance;
    }

    _evalBalance() {
        this.#balance = this.#movements.reduce(
            (acc, move) => acc + move.value,
            0
        );
    }

    _validateMovement(value: number): boolean {
        if (value < 0) throw new Error('Movements must be positive values.');
        return true;
    }

    deposit(value: number): Account {
        this._validateMovement(value);
        this.#movements.push(new Movement(value));
        this._evalBalance();
        return this;
    }

    withdraw(value: number): Account {
        this._validateMovement(value);
        this.#movements.push(new Movement(-value));
        this._evalBalance();
        return this;
    }

    incomes(): Array<Movement> {
        return this.#movements.filter(movement => movement.value > 0);
    }

    totalIncomes(): number {
        return this.#movements
            .filter(movement => movement.value > 0)
            .reduce((acc, movement) => acc + movement.value, 0);
    }

    withdrawals(value: number): Array<Movement> {
        return this.#movements.filter(movement => movement.value < 0);
    }

    totalWithdrawals(): number {
        return this.#movements
            .filter(movement => movement.value < 0)
            .map(movement => Math.abs(movement.value))
            .reduce((acc, value) => acc + value, 0);
    }

    interest() {
        return this.#movements
            .filter(movement => movement.value > 0)
            .map(deposit => (deposit.value * this.#interestRate) / 100)
            .filter(value => value > Bankist.minInterest)
            .reduce((acc, movement) => acc + movement);
    }

    static transfer(
        payer: Account,
        receiver: Account,
        amount: number
    ): boolean {
        payer.withdraw(-amount);
        receiver.deposit(amount);
        return true;
    }
}
