import { MigrationInterface, QueryRunner } from "typeorm";

export class phoneTelegram1665762548131 implements MigrationInterface {
    name = 'phoneTelegram1665762548131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telegramId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_df18d17f84763558ac84192c754" UNIQUE ("telegramId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4" UNIQUE ("firstName")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_af99afb7cf88ce20aff6977e68c" UNIQUE ("lastName")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_af99afb7cf88ce20aff6977e68c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_df18d17f84763558ac84192c754"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telegramId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
