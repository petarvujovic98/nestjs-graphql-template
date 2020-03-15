import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1584300371320 implements MigrationInterface {
  name = 'Initial1584300371320'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "example" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying NOT NULL DEFAULT '', "lastUpdatedBy" character varying NOT NULL DEFAULT '', "message" text NOT NULL, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "example"`, undefined)
  }
}
