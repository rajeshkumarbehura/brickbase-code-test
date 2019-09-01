const router = require('express').Router();
const eventController = require('../controllers/EventController');
const userController = require('../controllers/UserController');
const usersEventsController = require('../controllers/UsersEventsController');

/* Events api path */
router.route('/events').post(eventController.addEvent);
router.route('/events').get(eventController.getAllEvents);
router.route('/events/test').get(eventController.testEvent);

/* users api path  */
router.route('/users/test').get(userController.testUser);
router.route('/users').get(userController.getAllUser);
router.route('/users/:id').get(userController.getOneById);
router.route('/users').post(userController.addUser);

/* users and events  api path  */
router.route('/users-events').get(usersEventsController.getUserWithEvents);

module.exports = router;
