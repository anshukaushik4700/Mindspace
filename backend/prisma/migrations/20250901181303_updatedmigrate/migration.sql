-- AlterTable
ALTER TABLE "public"."JournalEntry" ALTER COLUMN "howWasYourDay" DROP NOT NULL,
ALTER COLUMN "howAreYouFeeling" DROP NOT NULL,
ALTER COLUMN "whatWasGoodToday" DROP NOT NULL;
