//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../index');
let should = chai.should();

let User = require('../../src/models/User');
let userSampleData = require('../data/user-data');
let eventSampleData = require('../data/event-data');

chai.use(chaiHttp);

describe('Event Controller Integration Testing.', function () {

    beforeEach((done) => {
        //Before each test we empty the database
        User.deleteMany({}, () => {
            done();
        });
    });

    it('GET - /api/v1/users-events?userId={}  find events by  User id.', (done) => {
        let userModel = userSampleData.userModel();
        userModel.personalId = new Date().getTime();
        userModel.save()
            .then((data) => {
                let event = eventSampleData.event();
                event.userId = data._id.toString();
                return event;
            })
            .then((event) => {
                return event.save();
            })
            .then((eventModel) => {
                chai.request(app)
                    .get('/api/v1/users-events?userId=' + eventModel.userId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data._id.should.be.eql(eventModel.userId);
                        res.body.data.events[0]._id.should.be.eql(eventModel._id.toString());
                        res.body.data.events[0].timeZoneOffset.should.be.eql(eventModel.timeZoneOffset);
                        res.body.data.events[0].title.should.be.eql(eventModel.title);
                        res.body.data.events[0].details.should.be.eql(eventModel.details);
                        res.body.data.events[0].userId.should.be.eql(eventModel.userId);
                        done();
                    });
            });
    });

    it('GET - /api/v1/users-events  find all users with events .', (done) => {
        let userModel = userSampleData.userModel();
        userModel.personalId = new Date().getTime();

        User.deleteMany({})
            .then(() => {
                return userModel.save()
            })
            .then((_userModel) => {
                let event = eventSampleData.event();
                event.userId = _userModel._id.toString();
                return event;
            })
            .then((event) => {
                return event.save();
            })
            .then((eventModel) => {
                chai.request(app)
                    .get('/api/v1/users-events')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('success').eq(true);
                        res.body.should.have.property('data').a('array');
                        res.body.data[0]._id.should.be.eql(eventModel.userId);
                        res.body.data[0].name.should.be.eql(userModel.name);
                        res.body.data[0].personalId.should.be.eql(userModel.personalId);
                        res.body.data[0].events[0]._id.should.be.eql(eventModel._id.toString());
                        res.body.data[0].events[0].timeZoneOffset.should.be.eql(eventModel.timeZoneOffset);
                        res.body.data[0].events[0].title.should.be.eql(eventModel.title);
                        res.body.data[0].events[0].details.should.be.eql(eventModel.details);
                        res.body.data[0].events[0].userId.should.be.eql(eventModel.userId);
                        done();
                    });
            });
    });

});
