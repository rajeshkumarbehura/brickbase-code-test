const usersEventsService = require('../services/users-events');
const responseDataUtil = require('../models/response-data');

const usersEventsController = {

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