-- CreateTable
CREATE TABLE "User" (
    "UUID" VARCHAR(36) NOT NULL,
    "VKID" INTEGER NOT NULL,
    "isAuth" BOOLEAN NOT NULL,

    PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Prize" (
    "UUID" VARCHAR(36) NOT NULL,
    "title" VARCHAR NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "degree" SMALLINT NOT NULL,
    "description" VARCHAR,
    "date" DATE,

    PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Setting" (
    "UUID" VARCHAR(36) NOT NULL,
    "seeded" BOOLEAN NOT NULL,

    PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "_PrizeToUser" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.VKID_unique" ON "User"("VKID");

-- CreateIndex
CREATE UNIQUE INDEX "_PrizeToUser_AB_unique" ON "_PrizeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PrizeToUser_B_index" ON "_PrizeToUser"("B");

-- AddForeignKey
ALTER TABLE "_PrizeToUser" ADD FOREIGN KEY ("A") REFERENCES "Prize"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrizeToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;
