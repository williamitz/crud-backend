export enum EPension {
    AFP = 'AFP',
    ONP = 'ONP'
}

export enum ESex {
    F = 'F',
    M = 'M',
    O = 'O'
}


export interface IClient {
    pkClient: number;
    name: string;
    surname: string;
    sex: ESex;
    pensionSystem: EPension;
    phone: string;
    salary: number;
}