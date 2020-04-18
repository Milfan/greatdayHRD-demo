import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './users.dto';
import { Accounts } from 'src/accounts/account.entity';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn() id:number;
    @Column({
        type: 'text',
    }) email:string;

    @Column('text') password:string;

    @OneToMany(type => Accounts, account => account.user)
    account: Accounts[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken = true): UserRO{
        const {id, email, token} = this;
        const responseObject: any = {id, email};

        if(showToken){
            responseObject.token = token;
        }
        return responseObject;
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }

    private get token(){
        const {id, email} = this;
        return jwt.sign(
            {
                id, 
                email
            },
            process.env.SECRET,
            { expiresIn: '1d' }
        );
    }
}
