import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowsMigration1709731004089 implements MigrationInterface {
    name = 'ShowsMigration1709731004089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shows\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`thumbnail\` text NOT NULL, \`year\` int NOT NULL, \`category\` varchar(255) NOT NULL, \`rating\` varchar(255) NOT NULL, \`isBookmarked\` tinyint NOT NULL, \`isTrending\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`shows\``);
    }

}
