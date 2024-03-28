/*
  Warnings:

  - Added the required column `repository` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "downloads" INTEGER NOT NULL,
    "downloadsLastMonth" INTEGER NOT NULL,
    "repository" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Revision_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Revision" ("createdAt", "downloads", "downloadsLastMonth", "id", "packageId", "size", "updatedAt", "version") SELECT "createdAt", "downloads", "downloadsLastMonth", "id", "packageId", "size", "updatedAt", "version" FROM "Revision";
DROP TABLE "Revision";
ALTER TABLE "new_Revision" RENAME TO "Revision";
CREATE INDEX "packageIdVersion" ON "Revision"("packageId", "version");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
