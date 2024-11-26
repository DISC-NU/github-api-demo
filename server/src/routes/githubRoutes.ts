import express from "express";
import { getGithubStats } from "../controllers/githubController";

const router = express.Router();

router.get("/github/:username", getGithubStats);
export default router;
