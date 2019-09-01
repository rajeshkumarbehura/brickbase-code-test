const Event = require('../models/Event');
const eventService = require('../services/EventService');
const responseDataUtil = require('../util/ResponseDataUtil');

module.exports = {

    /**
     * Add a new Event in System
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    addEvent: async (request, response) => {
        let responseData = await eventService.createEvent(request.body);
        responseDataUtil.updateResponse(response, responseData);
    },

    /**
     * Fetch all Events in system.
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    getAllEvents: async (request, response) => {
        let responseData = await eventService.findAllEvents();
        responseDataUtil.updateResponse(response, responseData);
    },

    /* Only for testing */
    testEvent: (req, res) => {
        eventService.getTestEvent();
        res.status(200).json({
            success: true,
            message: 'This is test message.',
        });
    },

};
