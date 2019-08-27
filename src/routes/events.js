const router = require('express').Router();
const eventController = require('../controllers/EventController');
const userController = require('../controllers/UserController');


router.route('/events').post(eventController.addEvent);
router.route('/events').get(eventController.getAllEvents);
router.route('/events/test').get(eventController.testEvent);


router.route('/users/test').get(userController.testEvent);
router.route('/users').get(userController.getAllUser);
router.route('/users/:id').get(userController.getOneById);
router.route('/users').post(userController.addUser);


module.exports = router;