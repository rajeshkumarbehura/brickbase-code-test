let chai = require('chai');
let should = chai.should();
let Event = require('../../src/models/Event');
let eventTestData = require('../data/event-data');

const eventService = require('../../src/services/EventService');
const db = require('../config/db');
const {assert} = require('chai');


describe('EventService Unit Test.', function () {

    before((done) => {
        db.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        db.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it("findAllEvents() - Find All Events Method", (done) => {
        let testEventModel = eventTestData.event();
        // create the  data
        testEventModel.save()
            .then(() => {
                //call test method
                return eventService.findAllEvents();
            })
            .then((result) => {
                let data = result.data;
                assert.isArray(data);
                assert.isNotNull(data[0]._id);
                assert.equal(testEventModel.title, data[0].title);
                assert.equal(testEventModel.details, data[0].details);
                assert.equal(testEventModel.userId, data[0].userId);
                assert.equal(testEventModel.location.address, data[0].location.address);
                assert.equal(testEventModel.location.address, data[0].location.address);
                assert.equal(testEventModel.location.latLng.lat, data[0].location.latLng.lat);
                assert.equal(testEventModel.location.latLng.lng, data[0].location.latLng.lng);
                done();
            });
    });


    it("createEvent() - Create a Event Method", (done) => {
        let testEventModel = eventTestData.eventModel;
        // create the  data

        Event.deleteMany({})
            .then(() => {
                return eventService.createEvent(testEventModel)
            })
            .then((result) => {
                let data = result.data;
                assert.isNotNull(data._id);
                assert.equal(testEventModel.title, data.title);
                assert.equal(testEventModel.details, data.details);
                assert.equal(testEventModel.userId, data.userId);
                assert.equal(testEventModel.location.address, data.location.address);
                assert.equal(testEventModel.location.address, data.location.address);
                assert.equal(testEventModel.location.latLng.lat, data.location.latLng.lat);
                assert.equal(testEventModel.location.latLng.lng, data.location.latLng.lng);
                done();
            });
    });


    it("createEvent() - Create a duplicate Event Method", (done) => {
        let testEventModel = eventTestData.eventModel;
        Event.deleteMany({})
            .then(() => {
                return eventService.createEvent(testEventModel)
            })
            .then(() => {
                // create a duplicate record
                return eventService.createEvent(testEventModel)
            })
            .then((result) => {
                //console.log(result);
                let data = result.data;
                assert.isFalse(result.success);
                assert.equal(400, result.statusCode);
                assert.isNotNull(data._id);
                done();
            });
    });

    it("createEvent() - Create a Event with Invalid Internal Error", (done) => {
        let testEventModel = eventTestData.invalidEventModel;
        // create the  data

        Event.deleteMany({})
            .then(() => {
                return eventService.createEvent(testEventModel)
            })
            .then((result) => {
                //console.log(result);
                assert.isFalse(result.success);
                assert.equal(500, result.statusCode);
                done();
            });
    });

});