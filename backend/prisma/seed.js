import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';
const prisma = new PrismaClient();
async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required for seeding.');
    }
    const passwordHash = await hashPassword(adminPassword);
    await prisma.user.upsert({
        where: { email: adminEmail.toLowerCase() },
        update: {
            passwordHash,
            role: Role.ADMIN,
            isActive: true
        },
        create: {
            email: adminEmail.toLowerCase(),
            passwordHash,
            firstName: 'Elora',
            lastName: 'Admin',
            role: Role.ADMIN,
            isActive: true
        }
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
