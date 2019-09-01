let chai = require('chai');
let should = chai.should();
let Event = require('../../src/models/Event');
let User = require('../../src/models/User');
let eventTestData = require('../data/event-data');
let userTestData = require('../data/user-data');

const usersEventsService = require('../../src/services/UsersEventService');
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

    it("findEventsByUserId() - Find All Events by User Id", (done) => {

        let userModel = userTestData.userModel();
        let eventModel = eventTestData.event();

        let savedUserModel = null;
        let savedEventModel = null;

        Event.deleteMany({})
            .then(() => {
                return User.deleteMany({});
            })
            .then(() => {
                return userModel.save();
            })
            .then((_savedUser) => {
                eventModel.userId = _savedUser._id.toString();
                savedUserModel = _savedUser;
                return eventModel.save();
            })
            .then((_savedEvent) => {
                savedEventModel = _savedEvent;
                return usersEventsService.findEventsByUserId(_savedEvent.userId);
            })
            .then((result) => {
                //console.log('result', JSON.stringify(result));
                let data = result.data;
                assert.isNotNull(data._id);
                assert.equal(savedUserModel._id.toString(), data._id.toString());
                assert.equal(savedUserModel.name, data.name);
                assert.equal(savedUserModel.personalId, data.personalId);
                assert.isArray(data.events);
                assert.equal(savedEventModel._id.toString(), data.events[0]._id.toString());
                assert.equal(savedEventModel.title, data.events[0].title);
                assert.equal(savedEventModel.detail, data.events[0].detail);
                done();
            })

    });


    it("findEventsForAllUser() - Find All Events Method", (done) => {

        let userModel = userTestData.userModel();
        let eventModel = eventTestData.event();

        let savedUserModel = null;
        let savedEventModel = null;

        Event.deleteMany({})
            .then(() => {
                return User.deleteMany({});
            })
            .then(() => {
                return userModel.save();
            })
            .then((_savedUser) => {
                eventModel.userId = _savedUser._id.toString();
                savedUserModel = _savedUser;
                return eventModel.save();
            })
            .then((_savedEvent) => {
                savedEventModel = _savedEvent;
                return usersEventsService.findEventsForAllUser();
            })
            .then((result) => {
                //console.log('result', JSON.stringify(result));
                let data = result.data;
                assert.isArray(data)
                assert.isNotNull(data[0]._id);
                assert.equal(savedUserModel._id.toString(), data[0]._id.toString());
                assert.equal(savedUserModel.name, data[0].name);
                assert.equal(savedUserModel.personalId, data[0].personalId);
                assert.isArray(data[0].events);
                assert.equal(savedEventModel._id.toString(), data[0].events[0]._id.toString());
                assert.equal(savedEventModel.title, data[0].events[0].title);
                assert.equal(savedEventModel.detail, data[0].events[0].detail);
                done();
            })
    });


    it("findEventsForAllUser() - When No record exists", (done) => {
        Event.deleteMany({})
            .then(() => {
                return User.deleteMany({});
            })
            .then(() => {
                return usersEventsService.findEventsForAllUser();
            })
            .then((result) => {
                //console.log('result', (result));
                let data = result.data;
                assert.isTrue(result.success);
                assert.isNotNull(data);
                assert.equal(0, data.length);
                done();
            })
    });

    it("findEventsByUserId() - When user does not events ", (done) => {

        let userModel = userTestData.userModel();
        let savedUserModel = null;

        Event.deleteMany({})
            .then(() => {
                return User.deleteMany({});
            })
            .then(() => {
                return userModel.save();
            })
            .then((_savedUser) => {
                savedUserModel = _savedUser;
                return usersEventsService.findEventsByUserId(_savedUser._id.toString());
            })
            .then((result) => {
                console.log('result', (result));
                let data = result.data;
                assert.isNotNull(data._id);
                assert.equal(savedUserModel._id.toString(), data._id.toString());
                assert.equal(savedUserModel.name, data.name);
                assert.equal(savedUserModel.personalId, data.personalId);
                assert.isArray(data.events);
                assert.equal(0, data.events.length);
                done();
            })
    });

    it("findEventsByUserId() - When user does not exist ", (done) => {
        User.deleteMany({})
            .then(() => {
                return usersEventsService.findEventsByUserId('5d6a62c30e42f714202515fa');
            })
            .then((result) => {
                //console.log('result', (result));
                assert.isFalse(result.success);
                assert.equal(400, result.statusCode);
                done();
            })
    });

});