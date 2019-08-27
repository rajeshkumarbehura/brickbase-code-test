const router = require('express').Router();
const eventController = require('../controllers/EventController');
const userController = require('../controllers/UserController');

router.route('/events').post(eventController.addEvent);
router.route('/events').get(eventController.getAllEvents);
router.route('/events/test').get(eventController.testEvent);


router.route('/users/test').get(userController.testEvent);


module.exports = router;