import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoles1743236138368 implements MigrationInterface {
  name = 'ChangeRoles1743236138368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`code\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`code\``);
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`name\``);
  }
}
