// src/migrations/1698765432101-CreateQuestionsTable.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionsTable1698765432101 implements MigrationInterface {
    name = "CreateQuestionsTable1698765432101";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "questions" (
        "id" SERIAL PRIMARY KEY,
        "question_text" TEXT NOT NULL,
        "options" VARCHAR[] NOT NULL,
        "correct_answer" INTEGER NOT NULL,
        "created_by" INTEGER NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT "FK_questions_created_by" FOREIGN KEY ("created_by")
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

        await queryRunner.query(`
      CREATE INDEX "IDX_questions_created_by" ON "questions" ("created_by")
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_questions_created_by"`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }
}
