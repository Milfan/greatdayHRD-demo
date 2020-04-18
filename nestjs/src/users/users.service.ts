import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository, Connection } from 'typeorm';
import { UserRO, UsersDTO } from './users.dto';
import { Accounts } from 'src/accounts/account.entity';
import * as randomString from 'randomstring';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) 
        private usersRepository: Repository<Users>,
        @InjectRepository(Accounts) 
        private accountRepository: Repository<Accounts>,
        private connection: Connection
    ){}

    private toResponseObject(user: Users){
        return {...user};
    }

    async getAllUsers(): Promise<UserRO[]>{
        const user =  await this.usersRepository.find({ 
            select: ['id', 'email'],
            relations: ['account']
        });
        return user.map(user => this.toResponseObject(user))
    }

    async login(data: UsersDTO): Promise<UserRO>{
        const{ email, password } = data;
        const user = await this.usersRepository.findOne({
            where: {email}
        })
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('Invalid Username/Password', HttpStatus.BAD_REQUEST)
        }
        return user.toResponseObject();
    }

    async register(data: UsersDTO): Promise<UserRO>{
        const{ email } = data;
        let user = await this.usersRepository.findOne({
            where: {email}
        });
        if(user){
            throw new HttpException('Email already use', HttpStatus.BAD_REQUEST);
        }

        await this.connection.transaction(async manager => {
            try{
                user = await this.usersRepository.create(data);
                const dataUser = await manager.save(user);
                const accountData = new Accounts();
                accountData.accountNumber = randomString.generate({
                    length: 10,
                    charset: 'numeric'
                });
                accountData.userId = dataUser.id;
                const account = this.accountRepository.create(accountData)
                await manager.save(account);
            }
            catch(err){
                throw new HttpException("error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
          });
        return user.toResponseObject(); 
    }

}
