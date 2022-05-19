declare type movement = {
    value: number;
    date: Date;
};

declare interface Account {
    owner: string;
    movements: Array<movement>;
    interestRate: number;
    username: string;
    pin: string;
    balance: number | undefined;
    locale: string;
    currency: string;
}

declare module '*.png' {
    const value: any;
    export = value;
}
