import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = "test@test.com";
    const password = "test1234";
    const name = "Test";

    await prisma.user.upsert({
        where: { email },
        update: {password, name},
        create: {
            email,
            password,
            name,
        },
    });
    console.log("Seed terminé. User:", { email, password });
}
main().finally(async () => {
    await prisma.$disconnect();
});
