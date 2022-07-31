const express = require("express");
const getNotificationLatest = require("../controllers/notificationsController/getNotificationLatest");
const getNotifications = require("../controllers/notificationsController/getNotifications");
const updateNotification = require("../controllers/notificationsController/updateNotification");
const { protect } = require("../middleware/auth");
const router = express.Router();

/**
 * @access     Private                  - only logged in users can access this route
 * @route      GET api/notifications    - get all notifications
 *
 */
router.use(protect);

router.route("/latest").get(getNotificationLatest);
router.route("/all").put(updateNotification);
router.route("/:id/open").put(updateNotification);
router.route("/").get(getNotifications);

module.exports = router;
