import { GenderEnum } from "../enums/gender.enum.ts";

export interface UserDTO {
    id?: string;
    name: string;
    dateBorn: Date;
    gender: GenderEnum;
    email: string;
    username: string;
    password: string;
    salary?: string | null;
    active: boolean;
}

export interface UserAccessDTO {
    username: string;
    password: string;
}
