import { Router } from "express";
import TeamController from "./controllers/teamController.js";
import playerController from "./controllers/playerController.js";
import matchController from "./controllers/matchController.js";

const router = Router();

router.get('/teams/all', TeamController.selectTeams);
router.get('/teams/team', TeamController.selectTeam);
router.post('/teams/create', TeamController.insertTeam);
router.put('/teams/update', TeamController.updateTeam);
router.delete('/teams/delete', TeamController.deleteTeam);

router.get('/players/all', playerController.selectPlayers);
router.get('/players/player', playerController.selectPlayer);
router.post('/players/create', playerController.insertPlayer);
router.put('/players/update', playerController.updatePlayer);
router.delete('/players/delete', playerController.deletePlayer);

router.get('/matches/all', matchController.selectMatches);
router.get('/matches/match', matchController.selectMatch);
router.post('/matches/create', matchController.insertMatch);
router.put('/matches/update', matchController.updateMatch);
router.delete('/matches/delete', matchController.deleteMatch);

export default router;