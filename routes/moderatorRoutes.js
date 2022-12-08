const express = require("express");
const router = express.Router();
const moderatorController = require('../controllers/moderatorController');
const { authenticateToken, authenticateRole } = require("../middlewares/authentication");
const Roles = require("../Roles");

router.get("/moderator",authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.getModerators);
router.post("/moderator", authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.createModerator);
router.put("/moderator/:Name", authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.updateModerator);
router.delete("/moderator/:Name", authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.deleteModerator);
router.post("/moderator/login", moderatorController.loginModerator);

module.exports = router;