import express from "express";
import {
  getVolunteerStats,
  getAvailableTasks,
  getVolunteerHistory,
  acceptTask,
} from "../controllers/volunteerController.js";

const router = express.Router();

router.get("/volunteer/stats", getVolunteerStats);
router.get("/volunteer/tasks", getAvailableTasks);
router.get("/volunteer/history", getVolunteerHistory);
router.post("/volunteer/accept", acceptTask);

export default router;
