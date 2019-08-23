const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.route('/event').post(EventController.addEvent);
router.route('/event').get(EventController.getAllEvents);
router.route('/test').get(EventController.testEvent);

module.exports = router;