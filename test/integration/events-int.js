//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../index');
let should = chai.should();
let event = require('../../src/models/Event');
let sampleData = require('../data/event-data');

chai.use(chaiHttp);

describe('Event Controller Integration Testing.', function () {

    beforeEach((done) => {
        //Before each test we empty the database
        event.deleteMany({}, () => {
            done();
        });
    });

    /*Case - Valid test api */
    it('GET  /api/v1/events/test', (done) => {
        chai.request(app)
            .get('/api/v1/events/test')
            .end((err, res) => {
                //console.log('Response - ', res.body);
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('This is test message.');
                done();
            });
    });


    it('POST  /api/v1/events - Create A New Event from json data', (done) => {
        chai.request(app)
            .post('/api/v1/events')
            .send(sampleData.eventModel)
            .end((err, res) => {
                //console.log('Response - ', res.body);
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id').a('string');
                res.body.data.should.have.property('start');
                res.body.data.should.have.property('end');
                res.body.data.should.have.property('timeZoneOffset');
                res.body.data.should.have.property('title');
                res.body.data.should.have.property('details');
                res.body.data.should.have.property('createdAt');
                res.body.data.should.have.property('updatedAt');
                res.body.data.should.have.property('userId');

                res.body.data.timeZoneOffset.should.be.eql(-480);
                res.body.data.title.should.be.eql(sampleData.eventModel.title);
                res.body.data.details.should.be.eql(sampleData.eventModel.details);
                res.body.data.userId.should.be.eql(sampleData.eventModel.userId);
                done();
            });
    });

    it('POST /api/v1/events - Create A Duplicate Event from json data', (done) => {
        sampleData.event().save()
            .then(function (existingEvent) {
                let existingEventId = existingEvent._id.toString();
                chai.request(app)
                    .post('/api/v1/events')
                    .send(sampleData.eventModel)
                    .end((err, res) => {
                        //console.log('Response -> ', res.body);
                        res.should.have.status(400);
                        res.body.data._id.should.be.eql(existingEventId);
                        done();
                    });
            });
    });


    it('GET  /api/v1/events - Get all  Events when no data exists.', (done) => {
        // remove all data at first
        event.deleteMany({}, () => {
            //console.log("all data cleared");
        }).then(function () {
            chai.request(app)
                .get('/api/v1/events')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('data').a('array');
                    done();
                });
        });
    });


    it('GET /api/v1/events - Get all  Events when data exists.', (done) => {
        // remove all data at first
        event.deleteMany({}, () => {
            //console.log("all data cleared");
        }).then((data) => {
            return sampleData.event().save();
        }).then(function (savedData) {
            chai.request(app)
                .get('/api/v1/events')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('data').a('array');
                    res.body.data[0]._id.should.be.eql(savedData._id.toString());
                    res.body.data[0].timeZoneOffset.should.be.eql(savedData.timeZoneOffset);
                    res.body.data[0].userId.should.be.eql(savedData.userId);
                    res.body.data[0].title.should.be.eql(savedData.title);
                    done();
                });
        });
    });
});
