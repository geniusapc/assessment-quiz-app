// src/scripts/seed-users-safe.ts
import { db } from "../config/data-source";
import { User, UserRole } from "../entities/User";
import { Role } from "../entities/Role"; // Import Role entity
import bcrypt from "bcrypt";

const usersData = [
    {
        email: "admin@quizapp.com",
        password: "admin123",
        roleName: UserRole.ADMIN
    },
    {
        email: "john.doe@example.com",
        password: "password123",
        roleName: UserRole.USER
    }
];

export const seedUsersSafe = async () => {
    try {
        await db.initialize();

        console.log("🔍 Checking if users table is empty...");
        const existingUsersCount = await db.getRepository(User).count();

        if (existingUsersCount > 0) {
            console.log(`⚠️  Users table already contains ${existingUsersCount} users. Skipping seeding.`);
            return;
        }

        console.log("✅ Users table is empty. Seeding users...");

        // Get all roles from database
        const roleRepository = db.getRepository(Role);
        const roles = await roleRepository.find();

        if (roles.length === 0) {
            console.log("❌ No roles found in database. Please seed roles first.");
            return;
        }

        const roleMap = new Map(roles.map(role => [role.name, role]));

        // Create users
        for (const userData of usersData) {
            const role = roleMap.get(userData.roleName);

            if (!role) {
                console.log(`❌ Role '${userData.roleName}' not found for user ${userData.email}`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(userData.password, 12);

            const user = db.getRepository(User).create({
                email: userData.email,
                password: hashedPassword,
                role: role
            });

            await db.getRepository(User).save(user);
            console.log(`✅ Created user: ${userData.email} with role: ${userData.roleName}`);
        }

        console.log("✅ Users seeded successfully!");

    } catch (error) {
        console.error("❌ Error seeding users:", error);
    } finally {
        await db.destroy();
        console.log("Database connection closed");
    }
}

