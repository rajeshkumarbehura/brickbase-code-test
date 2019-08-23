const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.route('/events').post(EventController.addEvent);
router.route('/events').get(EventController.getAllEvents);
router.route('/test').get(EventController.testEvent);

module.exports = router;