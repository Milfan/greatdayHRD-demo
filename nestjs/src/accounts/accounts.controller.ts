import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('api/accounts')
export class AccountsController {
    constructor(private service: AccountsService) { }

    @Get()
    @UseGuards(new AuthGuard())
    getAllData(){
        return this.service.getAccount();
    }
}
