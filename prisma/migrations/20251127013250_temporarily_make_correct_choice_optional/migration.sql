-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_correctChoiceId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correctChoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_correctChoiceId_fkey" FOREIGN KEY ("correctChoiceId") REFERENCES "Choice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
