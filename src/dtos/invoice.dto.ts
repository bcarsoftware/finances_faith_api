import { InvoiceEnum } from "../enums/invoice.enum.ts";
import { TransferEnum } from "../infra/prisma/enums.ts";

export interface InvoiceDTO {
    id?: string;
    title: string;
    description: string;
    typeInvoice: InvoiceEnum;
    balance: string;
    transfer: TransferEnum;
    cancel: boolean;
    bank: boolean;
    bankHub: boolean;
    cash: boolean;
    cashHub: boolean;
    tithe: boolean;
    offer: boolean;
    payment: boolean;
    userId: string;
}
