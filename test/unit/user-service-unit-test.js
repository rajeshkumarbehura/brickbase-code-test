let chai = require('chai');
let should = chai.should();
let User = require('../../src/models/User');
let userTestData = require('../data/user-data');

const userService = require('../../src/services/UserService');
const db = require('../config/db');
const {assert} = require('chai')


describe('UserService Unit Test.', function () {

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

    it("findAllUser() - Find All User Method", (done) => {

        let testUserModel = userTestData.userModel();
        // create the  data
        testUserModel.save().then(() => {
            //call test method
            userService.findAllUser().then((result) => {
                let data = result.data;
                assert.isArray(data);
                assert.isNotNull(data[0]._id);
                assert.equal(testUserModel.name, data[0].name);
                assert.equal(testUserModel.contactNo, data[0].contactNo);
                assert.equal(testUserModel.personalId, data[0].personalId);
                done();
            });
        });
    });


    it("findOneById() - Find by User id", (done) => {
        let testUserModel = userTestData.userModel();
        // create the  data
        testUserModel.save().then((savedUser) => {
            //call test method
            let userId = savedUser._id.toString();
            userService.findOneById(userId)
                .then((result) => {
                    let data = result.data;
                    assert.isNotNull(data._id);
                    assert.equal(testUserModel.name, data.name);
                    assert.equal(testUserModel.contactNo, data.contactNo);
                    assert.equal(testUserModel.personalId, data.personalId);
                    done();
                });
        });
    });


    it("findOneById() - Generated DB error with Status 500 ", (done) => {
        //call test method
        userService.findOneById('3076424e-e438-43b2-bef3-edbb2bad0371')
            .then((result) => {
                //console.log('error- ', result);
                assert.isFalse(result.success);
                assert.equal(500, result.statusCode);
                done();
            });
    });


    it("findByParams() - Find by Parameters - personal id", (done) => {
        let testUserModel = userTestData.userModel();
        testUserModel.personalId = new Date().getTime();
        // create the  data
        testUserModel.save().then((savedUser) => {
            //call test method
            userService.findByParams(savedUser.personalId)
                .then((result) => {
                    let data = result.data;
                    assert.isArray(data);
                    assert.isNotNull(data[0]._id);
                    assert.equal(testUserModel.name, data[0].name);
                    assert.equal(testUserModel.contactNo, data[0].contactNo);
                    assert.equal(testUserModel.personalId, data[0].personalId);
                    done();
                });
        });
    });


    it("createUser() - Create User Method", (done) => {
        let testUserJson = userTestData.userJson;
        // create the  data
        userService.createUser(testUserJson)
            .then((result) => {
                //console.log('saved user' ,result);
                let savedUser = result.data;
                assert.isNotNull(savedUser._id);
                assert.equal(testUserJson.name, savedUser.name);
                assert.equal(testUserJson.contactNo, savedUser.contactNo);
                assert.equal(testUserJson.personalId, savedUser.personalId);
                done();
            });
    });


    it("createUser() - Create User Method with Error", (done) => {
        let testUserJson = userTestData.invalidUserJson;
        // create the  data
        User.deleteMany({})
            .then(() => {
                userService.createUser(testUserJson)
                    .then((result) => {
                        //console.log('saved user', result);
                        assert.isFalse(result.success);
                        assert.equal(500, result.statusCode);
                        done();
                    });
            });
    });


    it("createUser() - Create a Duplicate User by Personal Id", (done) => {
        let testUserJson = userTestData.userJson;
        User.deleteMany({})
            .then(() => {
                return userService.createUser(testUserJson);
            })
            .then(() => {
                return userService.createUser(testUserJson);
            })
            .then((result) => {
                //console.log('result', result);
                assert.isFalse(result.success);
                assert.equal(400, result.statusCode);
                done();
            });
    });

});