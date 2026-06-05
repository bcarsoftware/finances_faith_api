export interface PaymentDTO {
    id?: string;
    name: string;
    description: string;
    balance: string;
    monthDate: Date;
    installments: number;
    paidInstallment: number;
    totalBalance?: string | null;
    userId: string;
}
