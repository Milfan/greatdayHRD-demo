import { IsNotEmpty } from 'class-validator';

export class TransactionsDTO{
    @IsNotEmpty()
    accountId: number;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    date: Date;
}

export class TransactionsRO {
    id: number;
    accountId: number;
    type: string;
    amount: number;
    date: Date;
}