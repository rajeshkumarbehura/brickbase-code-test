const usersEventsService = require('../services/UsersEventService'); 
const responseDataUtil = require('../util/ResponseDataUtil');


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
