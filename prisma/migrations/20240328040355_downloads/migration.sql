/*
  Warnings:

  - You are about to drop the column `location` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Revision` table. All the data in the column will be lost.
  - Added the required column `downloads` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloadsLastMonth` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloads` to the `Revision` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloadsLastMonth` to the `Revision` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL,
    "downloadsLastMonth" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Package" ("createdAt", "id", "name", "updatedAt", "userId") SELECT "createdAt", "id", "name", "updatedAt", "userId" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE TABLE "new_Revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "downloads" INTEGER NOT NULL,
    "downloadsLastMonth" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Revision_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Revision" ("createdAt", "id", "packageId", "updatedAt", "version") SELECT "createdAt", "id", "packageId", "updatedAt", "version" FROM "Revision";
DROP TABLE "Revision";
ALTER TABLE "new_Revision" RENAME TO "Revision";
CREATE INDEX "packageIdVersion" ON "Revision"("packageId", "version");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
