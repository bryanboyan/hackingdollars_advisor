-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT,
    "toolName" TEXT,
    "toolOutput" TEXT
);
