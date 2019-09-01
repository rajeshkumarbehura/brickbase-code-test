const userService = require('../services/UserService');
const responseDataUtil = require('../util/ResponseDataUtil');


const userController = {

    /* Only for testing */
    testUser: (req, res) => {
        userService.test();
        res.status(200).json({
            success: true,
            message: 'This is test message.',
        });
    },

    /**
     * Add a user in system.
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    addUser: async (request, response) => {
        let responseData = await userService.createUser(request.body);
        responseDataUtil.updateResponse(response, responseData);
    },

    /**
     * Fetch all users in system.
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    getAllUser: async (request, response) => {
        let responseData = null;
        if (request.query.personalId) {
            responseData = await userService.findByParams(request.query.personalId);
        } else {
            responseData = await userService.findAllUser();
        }
        responseDataUtil.updateResponse(response, responseData);
    },

    /**
     * Find a User by userId or _id.
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    getOneById: async (request, response) => {
        let responseData = await userService.findOneById(request.params.id);
        responseDataUtil.updateResponse(response, responseData);
    },

};

module.exports = userController;
