//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../index');
let should = chai.should();
let User = require('../../src/models/user');
let userTestData = require('../data/user-data');


chai.use(chaiHttp);

describe('Users API Integration Testing.', function () {


    beforeEach((done) => {
        //Before each test we empty the database
        User.deleteMany({}, () => {
            done();
        });
    });





    /*Case - Valid test api */
    it('GET /api/v1/users/test', (done) => {
        chai.request(app)
            .get('/api/v1/users/test')
            .end((err, res) => {
                console.log('Response - ', res.body);
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('This is test message.');
                done();
            });
    });


    it('GET /api/v1/testing 404 Path not found.', (done) => {
        chai.request(app)
            .get('/api/v1/user-testing')
            .end((err, res) => {
                res.should.have.status(404);
                console.log('Response - ', res.body);
                done();
            });
    });


    it('POST /api/v1/users - Create new User from json data', (done) => {
        chai.request(app)
            .post('/api/v1/users')
            .send(userTestData.userJson)
            .end((err, res) => {
                //console.log('Response - ', res.body);
                res.should.have.status(201);
                res.body.should.have.property('success').eq(true);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id').a('string');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('contactNo');
                res.body.data.should.have.property('personalId');
                res.body.data.should.have.property('createdAt');
                res.body.data.should.have.property('updatedAt');

                res.body.data.name.should.be.eql(userTestData.userJson.name);
                res.body.data.contactNo.should.be.eql(userTestData.userJson.contactNo);
                res.body.data.personalId.should.be.eql(userTestData.userJson.personalId);
                done();
            });
    });


    it('POST /api/v1/users - Create duplicate user from json data', (done) => {
        userTestData.userModel()
            .save()
            .then(function (savedUser) {
                let savedUserId = savedUser._id.toString();
                chai.request(app)
                    .post('/api/v1/users')
                    .send(userTestData.userJson)
                    .end((err, res) => {
                        //console.log('Response - ', res.body);
                        res.should.have.status(400);
                        res.body.data._id.should.be.eql(savedUserId);
                        done();
                    });
            });
    });

    it('GET /api/v1/users - Get all  Users .', (done) => {
        // remove all data at first
        User.deleteMany({})
            .then(userTestData.userModel().save())
            .then(function (savedUser) {
                chai.request(app)
                    .get('/api/v1/users')
                    .end((err, res) => {
                        console.log('Response - ', res.body);
                        res.should.have.status(200);
                        res.body.should.have.property('success').eq(true);
                        res.body.should.have.property('data').a('array');
                        done();
                    });
            });
    });


    it('GET /api/v1/users/:id - Find one by id .', (done) => {
        // first save one and then search for that
        userTestData.userModel()
            .save()
            .then(function (savedUser) {
                let savedUserId = savedUser._id.toString();
                chai.request(app)
                    .get('/api/v1/users/' + savedUserId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.have.property('_id').a('string');
                        res.body.data._id.should.be.eql(savedUserId);
                        res.body.data.name.should.be.eql(savedUser.name);
                        done();
                    });
            });
    });

    it('GET /api/v1/users?personalId={} - Find one by personal Id.', (done) => {
        // first save one and then search for that
        let userModel = userTestData.userModel();
        userModel.personalId = new Date().getTime();
        userModel.save()
            .then(function (savedUser) {
                console.log('response - ', savedUser);
                let savedUserId = savedUser._id.toString();
                chai.request(app)
                    .get('/api/v1/users?personalId=' + savedUser.personalId)
                    .end((err, res) => {
                        console.log('response - ', res.body);
                        res.should.have.status(200);
                        res.body.data[0].should.have.property('_id').a('string');
                        res.body.data[0]._id.should.be.eql(savedUserId);
                        res.body.data[0].name.should.be.eql(savedUser.name);
                        done();
                    });
            });
    });

});