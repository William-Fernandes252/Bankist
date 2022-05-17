declare interface Account {
    owner: string;
    movements: Array<number>;
    interestRate: 1.2;
    pin: string;
}

declare module '*.png' {
    const value: any;
    export = value;
}
