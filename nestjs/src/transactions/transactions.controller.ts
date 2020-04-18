import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { TransactionsDTO } from './transactions.dto';
import { AccountsDTO } from 'src/accounts/account.dto';

@Controller('api/transactions/')
export class TransactionsController {

    constructor(private service: TransactionsService) { }

    @Get()
    @UseGuards(new AuthGuard())
    getAllData(){
        return this.service.getTransactions();
    }

    @Post('setor')
    @UseGuards(new AuthGuard())
    simpanUang(@Body() dataAccount: AccountsDTO, @Body() data: TransactionsDTO){
        return this.service.simpan(dataAccount, data);
    }

    @Post('ambil')
    @UseGuards(new AuthGuard())
    ambilUang(@Body() dataAccount: AccountsDTO, @Body() data: TransactionsDTO){
        return this.service.ambil(dataAccount, data);
    }

    @Post('checksaldo')
    @UseGuards(new AuthGuard())
    checkSaldo(@Body() dataAccount: AccountsDTO){
        return this.service.cekSaldo(dataAccount);
    }
}
