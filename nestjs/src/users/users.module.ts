import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Accounts } from 'src/accounts/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Accounts])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
