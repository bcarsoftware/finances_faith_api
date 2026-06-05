import { PixEnum } from "../enums/pix.enum.ts";

export interface PixDTO {
    id?: string;
    title?: string | null;
    typePix: PixEnum;
    keyPix: string;
    bankId: string;
}
