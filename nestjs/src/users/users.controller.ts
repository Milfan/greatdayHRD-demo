import { Controller, Get, UseGuards, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './users.decorator';
import { Users } from './user.entity';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    @UseGuards(new AuthGuard())
    getAllData(@User() user: Users){
        console.log(user);
        return this.service.getAllUsers();
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    register(@Body() data: UsersDTO){
        return this.service.register(data);
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    login(@Body() data: UsersDTO){
        return this.service.login(data);
    }
}
