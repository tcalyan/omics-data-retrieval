import fs from "fs";
import { parse } from "csv-parse";
import mongoose from "mongoose";
import { GeneOmic } from "./mongoose/omics-schema";
import { resolve } from "path";
import { T_GeneOmic } from "../models/t-omics";

const dbURL = `${process.env.DB_CONN_STRING}/${process.env.DB_NAME}`;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME, // Replace with your MongoDB username
  pass: process.env.MONGO_PASSWORD, // Replace with your MongoDB password
  authSource: "admin", // Replace with the authentication source, if applicable
};

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(dbURL, dbOptions).then(() => {
    console.log(`Successfully connected to database`);
    resolve();
  });
}

export async function seedMockData(): Promise<void> {
  const mockGeneOmics: T_GeneOmic[] = [];
  fs.createReadStream(process.env.MOCK_DATA_PATH as string)
    .pipe(
      parse({
        delimiter: " ",
        columns: ["gene", "exp1", "exp2", "cont1", "cont2"],
        from: 2,
      })
    )
    .on("data", (row) => {
      let data: T_GeneOmic = {
        gene: row.gene,
        exper_rep1: parseFloat(row.exp1),
        exper_rep2: parseFloat(row.exp2),
        control_rep1: parseFloat(row.cont1),
        control_rep2: parseFloat(row.cont2),
      };
      mockGeneOmics.push(data);
    })
    .on("end", async () => {
      await GeneOmic.insertMany(mockGeneOmics);
    });
}
  