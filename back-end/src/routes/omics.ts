import { Router } from "express";
import {
  listOmicsDatasController,
  statistcForOmicController,
} from "../controller/c-omics";

const router = Router();

router.post("/list", listOmicsDatasController);
router.get("/:id/statistic", statistcForOmicController);

export default router;
