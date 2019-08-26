const Event = require('../../src/models/Events');

module.exports = {

    eventModel: {
        "end": "August 31, 2019 02:15",
        "start": "August 31, 2019 23:15",
        "title": "Test Event",
        "details": "Testing Event Bangok Stadium",
        "location": {
            "address": "1, bangok Street",
            "latLng": {
                "lat": 13.798159498972458,
                "lng": 100.53689315915108
            }
        }
    },

    event: () => {
        var event = new Event({
            "start": '2019-08-31T23:15:00.000Z',
            "end": '2019-08-31T02:15:00.000Z',
            "timeZoneOffset": -480,
            "title": 'Test Event',
            "details": 'Testing Event Bangok Stadium',
            "location": {
                "address": "1, bangok Street",
                "latLng": {
                    "lat": 13.798159498972458,
                    "lng": 100.53689315915108
                }
            }
        });
        return event;
    },

};