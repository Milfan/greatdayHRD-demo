import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AccountsRO } from './account.dto';
import { Users } from 'src/users/user.entity';

@Entity('accounts')
export class Accounts {

    @PrimaryGeneratedColumn() id:number;

    @Column() userId:number;
    
    @Column() accountNumber:string;

    @ManyToOne(type => Users, users => users.account )
    user: Users[]

    toResponseObject(): AccountsRO{
        const {id, accountNumber} = this;
        const responseObject: any = {id, accountNumber};
        return responseObject;
    }

}
