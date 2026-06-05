import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../src/infra/prisma/client.ts";

let connected = false;
dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export async function setupDatabase() {
    if (!connected) {
        await prisma.$connect();
        connected = true;
    }
}

export function prismaTest() {
    return prisma;
}

export async function closeDatabase() {
    if (connected) {
        await prisma.$disconnect();
        connected = false;
        dotenv.config({ path: ".env" });
    }
}
