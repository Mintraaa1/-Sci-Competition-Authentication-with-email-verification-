import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
//CREATE a new activity
router.post("/", activityController.createActivity);
//GET all activities
router.get("/", activityController.getAllActivities);
//GET activity by id
router.get("/:id", activityController.getActivityById);
//PUT update activity by id+
router.put("/:id", activityController.updateActivityById);
//DELETE activity by id
router.delete("/:id", activityController.deleteActivityById);

export default router;