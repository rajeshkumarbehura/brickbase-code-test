const Event = require('../models/Events');
const responseDataUtil = require('../models/response-data');

const EventService = {

    getTestEvent: () => {
        console.log(" Event Service method is called.");
    },


    createEvent: async (eventData) => {

        let eventModel = EventService.convertToModel(eventData);

        let existingEvent = await Event.findOne({
            $and: [
                {
                    'location.latLng.lng': eventModel.location.latLng.lng,
                    'location.latLng.lat': eventModel.location.latLng.lat,
                },
                {start: {$gte: eventModel.start}},
                {end: {$lte: eventModel.end}},
            ],
        });

        let responseData = null;

        if (existingEvent) {
            responseData = responseDataUtil
                .create(500, false, 'An Event already exist at this venue on this day', existingEvent);

        } else {

            await eventModel.save()
                .then((event) => {
                    responseData = responseDataUtil.create(200, true, "Event Created.", event);
                })
                .catch((err) => {
                    console.log(err);
                    responseData = responseDataUtil.create(500, false, 'An Error Occured');
                });
        }

        return responseData;
    },


    findAllEvents: async () => {
        let responseData = null;
        await Event.find({})
            .then((events) => {
                responseData = responseDataUtil.create(200, true, "Found Events.", events);
            })
            .catch((err) => {
                console.log("Error in findAllEvents", err);
                responseData = responseDataUtil.createDefaultError();
            });
        return responseData;
    },


    convertToModel: (request) => {
        let eventModel = new Event();

        const dateStart = new Date(request.start);
        dateStart.setTime(
            dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        );
        eventModel.start = dateStart;

        const dateEnd = new Date(request.end);
        dateEnd.setTime(
            dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        );
        eventModel.end = dateEnd;

        eventModel.timeZoneOffset = new Date().getTimezoneOffset();
        eventModel.title = request.title;
        eventModel.details = request.details;
        eventModel.location = request.location;
        return eventModel;
    }

};

module.exports = EventService;