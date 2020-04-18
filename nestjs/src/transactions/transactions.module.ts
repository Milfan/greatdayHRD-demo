import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { Accounts } from 'src/accounts/account.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Transactions, Accounts])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
