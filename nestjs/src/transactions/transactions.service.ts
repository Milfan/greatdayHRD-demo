import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { Repository } from 'typeorm';
import { TransactionsDTO, TransactionsRO } from './transactions.dto';
import { Accounts } from 'src/accounts/account.entity';
import { AccountsDTO } from 'src/accounts/account.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private transactionRepository: Repository<Transactions>,
        @InjectRepository(Accounts)
        private accountRepository: Repository<Accounts>,
    ){}

    private toResponseObject(transaction: Transactions){
        return {...transaction};
    }

    async getTransactions(){
        const transaction = await this.transactionRepository.find();
        return transaction;
    }

    async cekSaldo(data: AccountsDTO){
        const{ accountNumber } = data;
        const accountData = await this.accountRepository.findOne({
            where: {accountNumber}
        });
        if(!accountData){
            throw new HttpException('Account number not found', HttpStatus.BAD_REQUEST);
        }

        const transaction = await this.transactionRepository.find({
            select: ['id', 'amount', 'type', 'accountId'],
            where: { 
                accountId: accountData.id,
            },
        });

        let _balance = 0;
        transaction.forEach(element => {
            if(element.type == "SIMPAN"){
                _balance = element.amount
            }
            else{
                _balance -= element.amount
            }            
        });

        const resp = {
            balance: _balance
        }

        return resp;
    }

    async simpan(dataAccount: AccountsDTO, data: TransactionsDTO): Promise<TransactionsRO>{
        const{ accountNumber } = dataAccount;
        const accountData = await this.accountRepository.findOne({
            where: {accountNumber}
        });
        if(!accountData){
            throw new HttpException('Account number not found', HttpStatus.BAD_REQUEST);
        }

        const transactionData = new Transactions();
        transactionData.accountId = accountData.id
        transactionData.type = data.type;
        transactionData.amount = data.amount;
        transactionData.date = data.date;

        const transaction = await this.transactionRepository.create(transactionData);
        await this.transactionRepository.save(transaction);
        return transaction.toResponseObject();
    }

    async ambil(dataAccount: AccountsDTO, data: TransactionsDTO): Promise<TransactionsRO>{
        const{ accountNumber } = dataAccount;
        const accountData = await this.accountRepository.findOne({
            where: {accountNumber}
        });
        if(!accountData){
            throw new HttpException('Account number not found', HttpStatus.BAD_REQUEST);
        }

        const transactionData = new Transactions();
        transactionData.accountId = accountData.id
        transactionData.type = data.type;
        transactionData.amount = data.amount;
        transactionData.date = data.date;

        const transaction = await this.transactionRepository.create(transactionData);
        await this.transactionRepository.save(transaction);
        return transaction.toResponseObject();
    }
}
