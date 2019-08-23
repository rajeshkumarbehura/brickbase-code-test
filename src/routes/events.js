const router = require('express').Router();
const eventController = require('../controllers/EventController');

router.route('/events').post(eventController.addEvent);
router.route('/events').get(eventController.getAllEvents);
router.route('/test').get(eventController.testEvent);

module.exports = router;