import { BankEnum } from "../infra/prisma/enums";

export interface BankDTO {
    id?: string;
    name: string;
    description: string;
    typeAccount: BankEnum;
    balance: string;
    userId: string;
}
