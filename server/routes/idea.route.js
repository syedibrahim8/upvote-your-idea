import express from "express";
import { createIdea,getLeaderboard } from "../controllers/idea.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/submit", authMiddleware, createIdea);

export default router;