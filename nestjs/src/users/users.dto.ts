import { IsNotEmpty } from 'class-validator';

export class UsersDTO{
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class UserRO {
    id: number;
    email: string;
    token?: string
}