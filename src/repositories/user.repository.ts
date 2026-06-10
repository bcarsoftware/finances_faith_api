import { PrismaClient, User } from "../infra/prisma/client.ts";
import { UserAccessDTO, UserDTO } from "../dtos/user.dto.ts";
import { DatabaseException } from "../exceptions/database.exception.ts";
import { UserModel } from "../models/user.model.ts";
import { GenderEnum } from "../enums/gender.enum.ts";
import { UserException } from "../exceptions/user.exception.ts";
import { CoreException } from "../exceptions/core/core.exception.ts";

export class UserRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(user: UserDTO): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const newUser = await pc.user.create({ data: { ...user } });

                return await this.settingUserModel({
                    ...newUser,
                    password: "",
                });
            });
        } catch (error) {
            console.error(error);

            throw new DatabaseException("user.createUser");
        }
    }

    async updateUser(user: UserDTO): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const foundUser = await pc.user.findFirst({
                    where: { id: user.id, deleted: false },
                });

                if (!foundUser) {
                    throw new UserException({
                        code: 404,
                        cause: "update fails: there's not any user to this id",
                        message: "user not found",
                        stack: "user.updateUser.findFirst",
                    });
                }

                const updatedUser = await pc.user.update({
                    data: {
                        name: user.name,
                        dateBorn: user.dateBorn,
                        gender: user.gender,
                        email: user.email,
                        username: user.username,
                        salary: user.salary,
                    },
                    where: {
                        id: foundUser.id,
                    },
                });

                return await this.settingUserModel({
                    ...updatedUser,
                    password: "",
                });
            });
        } catch (error) {
            console.error(error);

            if (error instanceof CoreException) throw error;

            throw new DatabaseException("user.updateUser");
        }
    }

    async updateForgotPassword(user: UserAccessDTO): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const userId = await pc.user.findFirst({
                    where: {
                        deleted: false,
                        OR: [
                            { username: user.username },
                            { email: user.username },
                        ],
                    },
                    select: {
                        id: true,
                    },
                });

                if (!userId || !userId.id) {
                    throw new UserException({
                        code: 404,
                        cause: "update password fails: there's not any user to this email or username",
                        message: "user not found",
                        stack: "user.updateForgotUser.findFirst",
                    });
                }

                const updatedPassword = await pc.user.update({
                    data: {
                        password: user.password,
                    },
                    where: {
                        id: userId.id,
                    },
                });

                return await this.settingUserModel({
                    ...updatedPassword,
                    password: "",
                });
            });
        } catch (error) {
            console.error(error);

            if (error instanceof CoreException) throw error;

            throw new DatabaseException("user.updateForgotUser");
        }
    }

    async loginUser(user: UserAccessDTO): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const logged = await pc.user.findFirst({
                    where: {
                        OR: [
                            { email: user.username },
                            { username: user.username },
                        ],
                    },
                });

                if (!logged) {
                    throw new UserException({
                        code: 404,
                        cause: "user login fail: there's not any user to this email or username",
                        message: "user not found",
                        stack: "user.updateUser.findFirst",
                    });
                }

                if (logged.deleted) {
                    throw new UserException({
                        code: 403,
                        cause: "user login fail: the user is deactivated, you can reactivate it",
                        message: "user is deactivated",
                        stack: "user.loginUser.deactivated",
                    });
                }

                return await this.settingUserModel({ ...logged });
            });
        } catch (error) {
            console.error(error);

            if (error instanceof CoreException) throw error;

            throw new DatabaseException("user.loginUser");
        }
    }

    async reactivateUser(user: UserAccessDTO): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const logged = await pc.user.findFirst({
                    where: {
                        deleted: true,
                        OR: [
                            { email: user.username },
                            { username: user.username },
                        ],
                    },
                    select: {
                        id: true,
                    },
                });

                if (!logged || !logged.id) {
                    throw new UserException({
                        code: 404,
                        cause: "user reactivate fail: there's not any user to reactivate to this email or username",
                        message: "user not found",
                        stack: "user.reactivateUser.findFirst",
                    });
                }

                const reactivate = await pc.user.update({
                    data: {
                        deleted: false,
                    },
                    where: {
                        id: logged.id,
                    },
                });

                return await this.settingUserModel({ ...reactivate });
            });
        } catch (error) {
            console.error(error);

            if (error instanceof CoreException) throw error;

            throw new DatabaseException("user.reactivateUser");
        }
    }

    async deactivateUser(userId: string): Promise<UserModel> {
        try {
            return await this.prisma.$transaction(async (pc) => {
                const logged = await pc.user.findFirst({
                    where: {
                        deleted: false,
                        id: userId,
                    },
                    select: {
                        id: true,
                    },
                });

                if (!logged || !logged.id) {
                    throw new UserException({
                        code: 404,
                        cause: "user deactivate fail: there's not any user to deactivate to this id",
                        message: "user not found",
                        stack: "user.deactivateUser.findFirst",
                    });
                }

                const deactivate = await pc.user.update({
                    data: {
                        deleted: true,
                    },
                    where: {
                        id: logged.id,
                    },
                });

                return await this.settingUserModel({ ...deactivate });
            });
        } catch (error) {
            console.error(error);

            if (error instanceof CoreException) throw error;

            throw new DatabaseException("user.reactivateUser");
        }
    }

    private async settingUserModel(user: User): Promise<UserModel> {
        const salary = user.salary ? user.salary.toString() : undefined;

        return {
            ...user,
            salary: salary,
            gender: GenderEnum[user.gender],
            deleted: !!user.deleted,
        };
    }
}
