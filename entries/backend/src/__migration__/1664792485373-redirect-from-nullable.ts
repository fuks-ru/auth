import { MigrationInterface, QueryRunner } from "typeorm";

export class redirectFromNullable1664792485373 implements MigrationInterface {
    name = 'redirectFromNullable1664792485373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ALTER COLUMN "redirectFrom" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ALTER COLUMN "redirectFrom" SET NOT NULL`);
    }

}
