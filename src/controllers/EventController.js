const eventService = require('../services/events');
const responseDataUtil = require('../models/response-data');

module.exports = {

    addEvent: async (request, response) => {
        let responseData = await eventService.createEvent(request.body);
        responseDataUtil.updateResponse(response, responseData);
    },

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
