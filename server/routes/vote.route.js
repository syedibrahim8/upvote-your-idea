import express from "express";
import { voteIdea } from "../controllers/vote.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, voteIdea);

export default router;