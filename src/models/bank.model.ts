import { BankEnum } from "../infra/prisma/enums";

export interface BankModel {
    id: string;
    name: string;
    description: string;
    typeAccount: BankEnum;
    balance: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
