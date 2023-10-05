import { ObjectId } from "mongoose";

export type T_GeneOmic = {
  id?: ObjectId;
  gene: string;
  exper_rep1: number;
  exper_rep2: number;
  control_rep1: number;
  control_rep2: number;
};

export type T_GeneOmicStatisc = {
  exper_rep_median: number | null;
  exper_rep_mean: number | null;
  exper_rep_variance: number | null;
  control_rep_median: number | null;
  control_rep_mean: number | null;
  control_rem_variance: number | null;
};

export type T_ListGeneOmicFilter = {
  filter?: {
    ids: [];
  };
};
