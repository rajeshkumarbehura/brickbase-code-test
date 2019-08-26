//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
let db = require('../src/config/db');
let event = require('../src/models/Events');
let sampleData = require('../test/data/event-data');

chai.use(chaiHttp);

describe('Event Controller Integration Testing.', function () {

    beforeEach((done) => {
        //Before each test we empty the database
        event.deleteMany({}, () => {
            done();
        });
    });

    after((done) => {
        // close the db connection
        db.close(function () {
            console.log("connection is closed");
            // kill the server
            // process.exit(0);
            done();
        });
    });

    /*Case - Valid test api */
    it('API - /api/v1/test', (done) => {
        chai.request(app)
            .get('/api/v1/test')
            .end((err, res) => {
                console.log('Response - ', res.body);
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('This is test message.');
                //   res.body.should.have.property('message').not(null);
                done();
            });
    });


    it('API - Create A New Event from json data', (done) => {
        chai.request(app)
            .post('/api/v1/events')
            .send(sampleData.eventModel)
            .end((err, res) => {
                console.log('****Response - ', res.body);
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

                res.body.data.timeZoneOffset.should.be.eql(-480);
                res.body.data.title.should.be.eql(sampleData.eventModel.title);
                res.body.data.details.should.be.eql(sampleData.eventModel.details);
                done();
            });
    });

    it('API - Create A Duplicate Event from json data', (done) => {
        sampleData.event().save()
            .then(function (existingEvent) {
                console.log('existing id  ', existingEvent);
                let existingEventId = existingEvent._id.toString();
                chai.request(app)
                    .post('/api/v1/events')
                    .send(sampleData.eventModel)
                    .end((err, res) => {
                        console.log('Response -> ', res.body);
                        res.should.have.status(500);
                        res.body.data._id.should.be.eql(existingEventId);
                        done();
                    });
            });
    });


    it('API - Get all  Events when no data exists.', (done) => {
        // remove all data at first
        event.deleteMany({}, () => {
            console.log("all data cleared");
        }).then(function () {
            chai.request(app)
                .get('/api/v1/events')
                .end((err, res) => {
                    console.log('****Response - ', res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('data').a('array');
                    //  res.body.should.have.property('data').a('array').length.should.be.eql(0);
                    done();
                });
        });
    });


    it('API - Get all  Events when no data exists.', (done) => {
        // remove all data at first
        event.deleteMany({}, () => {
            console.log("all data cleared");
        }).then(function () {
            chai.request(app)
                .get('/api/v1/events')
                .end((err, res) => {
                    console.log('****Response - ', res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('data').a('array');
                    //  res.body.should.have.property('data').a('array').length.should.be.eql(0);
                    done();
                });
        });
    });


});