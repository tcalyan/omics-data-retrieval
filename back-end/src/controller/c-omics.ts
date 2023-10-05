import { T_ListGeneOmicFilter } from "../models/t-omics";
import { listOmicsData, statisticsForOmicData } from "../services/omics";
import { Response, Request } from "express";
import logger from "../utils/logger";

export async function listOmicsDatasController(req: Request, res: Response) {
  const body: T_ListGeneOmicFilter = req.body as T_ListGeneOmicFilter;
  const result = await listOmicsData(body);
  res.json(result);
}

export async function statistcForOmicController(req: Request, res: Response) {
  try {
    const result = await statisticsForOmicData(req.params.id);
    res.json(result);
  } catch (error) {
    logger.error((error as Error).message);
    throw error;
  }
}
