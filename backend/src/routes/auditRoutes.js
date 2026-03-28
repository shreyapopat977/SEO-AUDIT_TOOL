import express from "express";
import {
    startAudit,
    getAudit
} from "../controllers/auditController.js";

const router = express.Router();

router.post("/", startAudit);
router.get("/:id", getAudit);

export default router;