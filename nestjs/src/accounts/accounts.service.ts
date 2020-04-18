import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './account.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts) 
        private accountRepository: Repository<Accounts>,
    ){}

    async getAccount(){
        const account = await this.accountRepository.find();
        return account.map(user => user.toResponseObject())
    }
}
