const userService = require('../services/users');
const responseDataUtil = require('../models/response-data');

const userController = {

    /* Only for testing */
    testUser: (req, res) => {
        userService.test();
        res.status(200).json({
            success: true,
            message: 'This is test message.',
        });
    },

    addUser: async (request, response) => {
        let responseData = await userService.createUser(request.body);
        responseDataUtil.updateResponse(response, responseData);
    },

    getAllUser: async (request, response) => {
        let responseData = null;
        if (request.query.personalId) {
            responseData = await userService.findByParams(request.query.personalId);
        } else {
            responseData = await userService.findAllUser();
        }
        responseDataUtil.updateResponse(response, responseData);
    },

    getOneById: async (request, response) => {
        let responseData = await userService.findOneById(request.params.id);
        responseDataUtil.updateResponse(response, responseData);
    },

};

module.exports = userController;
