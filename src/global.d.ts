declare namespace Bankist {
    const minInterest = 1;

    interface IMovement {
        _value: number;
        _date: Date;
    }

    interface IAccount {
        #owner: string;
        #username: string;
        #movements: Array<movement>;
        #interestRate: number;
        #username: string;
        #pin: string;
        #balance: number | undefined;
        #locale: string;
        #currency: string;
        #balance: number;
        _validateMovement: (value: number) => boolean;
        deposit: (value: number) => IAccount;
        withdraw: (value: number) => IAccount;
    }
}

declare module '*.png' {
    const value: any;
    export = value;
}
