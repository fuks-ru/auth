import { MigrationInterface, QueryRunner } from "typeorm";

export class rolesStringEnum1664872756060 implements MigrationInterface {
    name = 'rolesStringEnum1664872756060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" integer NOT NULL`);
    }

}
