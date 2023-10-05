import express from "express";
import { connectToDatabase, seedMockData } from "./database/mongodb";
import { startHttpServer } from "./www/server";

const app = express();

async function main() {
  await startHttpServer(app);
  await connectToDatabase();
  await seedMockData();
}

main();
