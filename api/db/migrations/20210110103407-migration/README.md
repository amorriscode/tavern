# Migration `20210110103407-migration`

This migration has been generated by Anthony Morris at 1/10/2021, 2:34:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Language" AS ENUM ('JAVASCRIPT')

CREATE TABLE "Difficulty" (
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("name")
)

CREATE TABLE "TestCase" (
"id" SERIAL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Scaffold" (
    "id" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Problem" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficultyName" TEXT NOT NULL,
    "hints" TEXT[],
    "sampleInput" TEXT NOT NULL,
    "sampleOutput" TEXT NOT NULL,
    "checksum" TEXT,
    "entrypoints" JSONB,

    PRIMARY KEY ("id")
)

CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "testCaseId" INTEGER,
    "output" TEXT,
    "executionTime" INTEGER NOT NULL,
    "stacktrace" TEXT,
    "errorLogs" TEXT[],

    PRIMARY KEY ("id")
)

CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "AssignedProblem" (
    "id" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "guildId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "guildId" TEXT,
    "delta" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "guildId" TEXT,
    "level" INTEGER NOT NULL,
    "titleId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unlockLevel" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

ALTER TABLE "TestCase" ADD FOREIGN KEY("problemId")REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Scaffold" ADD FOREIGN KEY("problemId")REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Problem" ADD FOREIGN KEY("difficultyName")REFERENCES "Difficulty"("name") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Solution" ADD FOREIGN KEY("testCaseId")REFERENCES "TestCase"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "AssignedProblem" ADD FOREIGN KEY("problemId")REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "AssignedProblem" ADD FOREIGN KEY("guildId")REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Transaction" ADD FOREIGN KEY("guildId")REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "User" ADD FOREIGN KEY("guildId")REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "User" ADD FOREIGN KEY("titleId")REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210110103407-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,116 @@
+datasource DS {
+  // optionally set multiple providers
+  // example: provider = ["sqlite", "postgresql"]
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+model Difficulty {
+  name        String    @id
+  color       String
+  description String
+  Problem     Problem[]
+}
+
+model TestCase {
+  id        Int        @id @default(autoincrement())
+  problem   Problem    @relation(fields: [problemId], references: [id])
+  problemId Int
+  input     String
+  output    String
+  Solution  Solution[]
+}
+
+enum Language {
+  JAVASCRIPT
+}
+
+model Scaffold {
+  id        String   @id
+  problem   Problem  @relation(fields: [problemId], references: [id])
+  problemId Int
+  body      String
+  language  Language
+}
+
+model Problem {
+  id               Int               @id
+  name             String
+  description      String
+  difficulty       Difficulty        @relation(fields: [difficultyName], references: [name])
+  difficultyName   String
+  hints            String[]
+  sampleInput      String
+  sampleOutput     String
+  testCases        TestCase[]
+  scaffolds        Scaffold[]
+  checksum         String?
+  entrypoints      Json?
+  assignedProblems AssignedProblem[]
+}
+
+model Solution {
+  id            String    @id @default(uuid())
+  body          String
+  success       Boolean
+  testCase      TestCase? @relation(fields: [testCaseId], references: [id]) // test case they failed if they failed
+  testCaseId    Int?
+  output        String? // output they got (wrong one)
+  executionTime Int
+  stacktrace    String?
+  errorLogs     String[] // logs for test case the failed if failed
+}
+
+model Guild {
+  id               String            @id @default(uuid())
+  name             String
+  experience       Int               @default(0)
+  createdAt        DateTime          @default(now())
+  transactions     Transaction[]
+  users            User[]
+  assignedProblems AssignedProblem[]
+}
+
+model AssignedProblem {
+  id        String   @id @default(uuid())
+  problem   Problem  @relation(fields: [problemId], references: [id])
+  problemId Int
+  guild     Guild?   @relation(fields: [guildId], references: [id])
+  guildId   String?
+  createdAt DateTime @default(now())
+}
+
+// experience transactions
+model Transaction {
+  id      String   @id @default(uuid())
+  guild   Guild?   @relation(fields: [guildId], references: [id])
+  guildId String?
+  delta   Int
+  result  Int // total experience after delta
+  time    DateTime @default(now())
+  // todo: user id
+  // transactions can exist for both users + guilds
+}
+
+model User {
+  id      String  @id @default(uuid())
+  name    String
+  email   String  @unique
+  guild   Guild?  @relation(fields: [guildId], references: [id])
+  guildId String?
+  level   Int
+  title   Title   @relation(fields: [titleId], references: [id])
+  titleId String
+}
+
+model Title {
+  id          String @id @default(uuid())
+  name        String
+  users       User[]
+  unlockLevel Int
+}
```

