import { GeneOmic } from "../database/mongoose/omics-schema";
import { T_GeneOmic, T_GeneOmicStatisc } from "../models/t-omics";
import {
  calculateMean,
  calculateMedian,
  calculateVariance,
} from "../utils/statistics";

export async function listOmicsData(params: {
  filter?: {
    ids: [];
  };
}): Promise<T_GeneOmic[]> {
  let query = GeneOmic.find();
  if (params.filter && params.filter.ids.length > 0) {
    query.where("_id").in(params.filter.ids);
  }

  const geneOmics = (await query.exec()).map((elem) => {
    return {
      id: elem.id,
      gene: elem.gene,
      exper_rep1: elem.exper_rep1,
      exper_rep2: elem.exper_rep2,
      control_rep1: elem.control_rep1,
      control_rep2: elem.control_rep2,
    };
  });

  return geneOmics;
}
export async function statisticsForOmicData(
  id: string
): Promise<T_GeneOmicStatisc> {
  const geneOmic = (
    await GeneOmic.find<T_GeneOmic>().where("_id").equals(id)
  )[0];
  if (geneOmic) {
    const experimentalNumbers = [geneOmic.exper_rep1, geneOmic.exper_rep2];
    const controlNumbers = [geneOmic.control_rep1, geneOmic.control_rep2];
    let statisticData: T_GeneOmicStatisc = {
      exper_rep_mean: await calculateMean(experimentalNumbers),
      exper_rep_median: await calculateMedian(experimentalNumbers),
      exper_rep_variance: await calculateVariance(experimentalNumbers),
      control_rep_median: await calculateMedian(controlNumbers),
      control_rep_mean: await calculateMean(controlNumbers),
      control_rem_variance: await calculateVariance(controlNumbers),
    };
    return statisticData;
  } else {
    throw new Error("Gene Omic cannot find by id !");
  }
}
