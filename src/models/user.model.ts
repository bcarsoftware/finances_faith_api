import { GenderEnum } from "../enums/gender.enum.ts";

export interface UserModel {
    id: string;
    name: string;
    dateBorn: Date;
    gender: GenderEnum;
    email: string;
    username: string;
    password: string;
    salary?: string | null;
    active: boolean;
    deleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
