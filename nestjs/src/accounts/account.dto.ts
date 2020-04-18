import { IsNotEmpty } from 'class-validator';

export class AccountsDTO{
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    accountNumber: string;
}

export class AccountsRO {
    id: number;
    userId: number;
    accountNumber: string;
}