import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1719291060874 implements MigrationInterface {
    name = 'Init1719291060874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consumers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "document" character varying NOT NULL, "birthDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_748b9415b9ed8cbc8a63bf996a5" UNIQUE ("document"), CONSTRAINT "PK_9355367764efa60a8c2c27856d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_profile_enum" AS ENUM('sudo', 'standard')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile" "public"."users_profile_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "consumerId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."conversation_messages_by_enum" AS ENUM('consumer', 'user', 'system')`);
        await queryRunner.query(`CREATE TABLE "conversation_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "by" "public"."conversation_messages_by_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_113248f25c4c0a7c179b3f5a609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53c192c8946697d8daf0f0c93f" ON "conversation_messages" ("conversationId", "createdAt") `);
        await queryRunner.query(`ALTER TABLE "conversations" ADD CONSTRAINT "FK_0dfc2236cdae057b30e9afce6b2" FOREIGN KEY ("consumerId") REFERENCES "consumers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversations" ADD CONSTRAINT "FK_a9b3b5d51da1c75242055338b59" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" ADD CONSTRAINT "FK_f5045a77718bdb593f309a1e258" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" ADD CONSTRAINT "FK_3a46283d969e7cb41a4da1a0cf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_messages" DROP CONSTRAINT "FK_3a46283d969e7cb41a4da1a0cf5"`);
        await queryRunner.query(`ALTER TABLE "conversation_messages" DROP CONSTRAINT "FK_f5045a77718bdb593f309a1e258"`);
        await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_a9b3b5d51da1c75242055338b59"`);
        await queryRunner.query(`ALTER TABLE "conversations" DROP CONSTRAINT "FK_0dfc2236cdae057b30e9afce6b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53c192c8946697d8daf0f0c93f"`);
        await queryRunner.query(`DROP TABLE "conversation_messages"`);
        await queryRunner.query(`DROP TYPE "public"."conversation_messages_by_enum"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_profile_enum"`);
        await queryRunner.query(`DROP TABLE "consumers"`);
    }

}
