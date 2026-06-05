export interface InvoiceLogDTO {
    id?: string;
    userId: string;
    invoiceId: string;
    titheId?: string | null;
    offerId?: string | null;
    cashId?: string | null;
    cashHubId?: string | null;
    bankId?: string | null;
    bankHubId?: string | null;
    paymentId?: string | null;
}
