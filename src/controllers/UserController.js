
const userService = require('../services/users');
const responseDataUtil = require('../models/response-data');

const userController = {

    /* Only for testing */
    testEvent: (req, res) => {
        userService.test();
        res.status(200).json({
            success: true,
            message: 'This is test message.',
        });
    },

};

module.exports = userController;
