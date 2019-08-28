const usersEventsService = require('../services/users-events');
const responseDataUtil = require('../models/response-data');

const usersEventsController = {

    /**
     * Get Users events either all or by parameters
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    getUserWithEvents: async (request, response) => {
        let responseData = null;
        if (request.query.userId) {
            responseData = await usersEventsService.findEventsByUserId(request.query.userId);
        } else {
            responseData = await usersEventsService.findEventsForAllUser();
        }
        responseDataUtil.updateResponse(response, responseData);
    },

};

module.exports = usersEventsController;