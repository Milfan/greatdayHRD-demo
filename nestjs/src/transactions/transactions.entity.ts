import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TransactionsRO } from "./transactions.dto";

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn() id:number;

    @Column() accountId: number;
    @Column() type: string;
    @Column("double")
    amount: number;

    @Column() date: Date;

    toResponseObject(): TransactionsRO{
        const {id, accountId, type, amount, date } = this;
        const responseObject: any = {id, accountId, type, amount, date};
        return responseObject;
    }

}
