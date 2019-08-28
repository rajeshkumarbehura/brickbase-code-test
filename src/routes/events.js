const router = require('express').Router();
const eventController = require('../controllers/EventController');
const userController = require('../controllers/UserController');
const usersEventsController = require('../controllers/UsersEventsController');


router.route('/events').post(eventController.addEvent);
router.route('/events').get(eventController.getAllEvents);
router.route('/events/test').get(eventController.testEvent);


router.route('/users/test').get(userController.testUser);
router.route('/users').get(userController.getAllUser);
router.route('/users/:id').get(userController.getOneById);
router.route('/users').post(userController.addUser);

//router.route('/users/:id/events').get(userController.getUserWithEventById);
//router.route('/users/events').get(userController.getAllUsersWithEvents);

router.route('/users-events').get(usersEventsController.getUserWithEvents);

module.exports = router;