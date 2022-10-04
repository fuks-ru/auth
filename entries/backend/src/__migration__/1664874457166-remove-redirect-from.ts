import { MigrationInterface, QueryRunner } from "typeorm";

export class removeRedirectFrom1664874457166 implements MigrationInterface {
    name = 'removeRedirectFrom1664874457166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" DROP COLUMN "redirectFrom"`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP COLUMN "redirectFrom"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD "redirectFrom" character varying`);
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" ADD "redirectFrom" character varying NOT NULL`);
    }

}
