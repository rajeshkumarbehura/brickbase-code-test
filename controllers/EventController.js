const Event = require('../models/Events');

const self = module.exports = {

    addEvent: async (request, response) => {

        /* let eventData = {
             end: 1567268130000,
             start: 1567257330000,
             timeZoneOffset: -450,
             title: "Test Event",
             details: "Testing Event Bangok Stadium",
             location: {
                 address: "1, bangok Street",
                 latLng: {
                     lat: 13.798159498972458,
                     lng: 100.53689315915108,
                 },
             },
         };
        */
        let eventModel = self.convertToModel(request.body);

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

        if (existingEvent) {
            response.status(500).json({
                success: false,
                message: 'An Event already exist at this venue on this day',
                event: existingEvent
            });
        } else {

            await eventModel.save()
                .then((event) => {
                    response.status(200).json({
                        success: true,
                        event,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    response.status(500).json({
                        success: false,
                        message: 'An Error Occured, please try again later',
                    });
                });
        }

    },

    getAllEvents: async (req, res) => {
        Event.find({})
            .then((events) => {
                res.json({success: true, events});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'An Error Occured, please try again later',
                });
            });
    },

    testEvent: (req, res) => {
        res.status(200).json({
            success: true,
            message: 'This is test message.',
        });
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

        //eventModel.end = request.data;
        //eventModel.start = request.start;
        eventModel.timeZoneOffset = new Date().getTimezoneOffset();
        eventModel.title = request.title;
        eventModel.details = request.details;
        eventModel.location = request.location;
        return eventModel;
    }

};
