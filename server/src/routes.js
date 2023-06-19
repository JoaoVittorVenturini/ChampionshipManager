import { Router } from "express";
import timeController from "./app/controllers/teamController.js";

const router = Router();

router.get('/teams/all', timeController.selectTeams);
router.get('/teams/team', timeController.selectTeam);
router.post('/teams/create', timeController.insertTeam);
router.put('/teams/update', timeController.updateTeam);
router.delete('/teams/delete', timeController.deleteTeam);

export default router;