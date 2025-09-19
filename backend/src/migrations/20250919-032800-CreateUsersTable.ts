// src/migrations/1698765432100-CreateUsersTable.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1698765432100 implements MigrationInterface {
    name = 'CreateUsersTable1698765432100';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First create the roles table if it doesn't exist
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "roles" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(50) UNIQUE NOT NULL,
                "description" VARCHAR(255),
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `);

        // Insert default roles
        await queryRunner.query(`
            INSERT INTO "roles" ("name", "description") VALUES
            ('ADMIN', 'Administrator with full access'),
            ('USER', 'Regular user with limited access')
            ON CONFLICT (name) DO NOTHING
        `);

        // Create the users table with role foreign key
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL,
                "role_id" INTEGER NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT "FK_users_role_id" FOREIGN KEY ("role_id") 
                REFERENCES "roles"("id") ON DELETE RESTRICT
            )
        `);

        // Create indexes for better performance
        await queryRunner.query(`
            CREATE INDEX "IDX_users_email" ON "users" ("email")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_users_role_id" ON "users" ("role_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_users_role_id"`);
        await queryRunner.query(`DROP INDEX "IDX_users_email"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }
}