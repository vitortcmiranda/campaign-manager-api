-- Create the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the Campaign table
CREATE TABLE "campaign" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "nome" VARCHAR NOT NULL,
    "dataCadastro" TIMESTAMP NOT NULL DEFAULT now(),
    "dataInicio" TIMESTAMP NOT NULL,
    "dataFim" TIMESTAMP NOT NULL,
    "status" VARCHAR NOT NULL,
    "categoria" VARCHAR NOT NULL,
    "deletedAt" TIMESTAMP
);