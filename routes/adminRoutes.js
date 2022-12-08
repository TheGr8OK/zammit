const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const moderatorController = require("../controllers/moderatorController")
const { authenticateToken, authenticateRole } = require("../middlewares/authentication");
const Roles = require("../Roles");

router.get("/admin", authenticateToken, authenticateRole(Roles.ADMIN), adminController.getAdmins);
router.post("/admin", authenticateToken, authenticateRole(Roles.ADMIN), adminController.createAdmin);
router.get("/admin/:Name", authenticateToken, authenticateRole(Roles.ADMIN), adminController.getAdmin);
router.put("/admin/:Name", authenticateToken, authenticateRole(Roles.ADMIN), adminController.updateAdmin);
router.delete("/admin/:Name", authenticateToken, authenticateRole(Roles.ADMIN), adminController.deleteAdmin);
router.post("/admin/login", adminController.loginAdmin);
router.post("/admin/createModerator", authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.createModerator)
router.post("/admin/getModerator", authenticateToken, authenticateRole(Roles.ADMIN), moderatorController.getModerator);


module.exports = router;