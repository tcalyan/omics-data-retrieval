import mongoose from "mongoose";
import { T_GeneOmic } from "../../models/t-omics";

const Schema = mongoose.Schema;

const omic = new Schema<T_GeneOmic>({
  gene: String,
  exper_rep1: Number,
  exper_rep2: Number,
  control_rep1: Number,
  control_rep2: Number,
});

export const GeneOmic = mongoose.model("GeneOmic", omic);
