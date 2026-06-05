import { PixEnum } from "../enums/pix.enum.ts";

export interface PixModel {
    id: string;
    title?: string | null;
    typePix: PixEnum;
    keyPix: string;
    bankId: string;
    createdAt: Date;
    updatedAt: Date;
}
