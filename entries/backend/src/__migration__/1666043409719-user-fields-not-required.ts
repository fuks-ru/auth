import { MigrationInterface, QueryRunner } from "typeorm";

export class userFieldsNotRequired1666043409719 implements MigrationInterface {
    name = 'userFieldsNotRequired1666043409719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD "data" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_df18d17f84763558ac84192c754"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_af99afb7cf88ce20aff6977e68c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_af99afb7cf88ce20aff6977e68c" UNIQUE ("lastName")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5372672fbfd1677205e0ce3ece4" UNIQUE ("firstName")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_df18d17f84763558ac84192c754" UNIQUE ("telegramId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP COLUMN "data"`);
    }

}
