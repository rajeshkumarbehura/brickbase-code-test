/**
 *  Write the logic and database crud operation for User goes here in Service Layer.
 */
const user = require('../models/User');
const responseDataUtil = require('../models/response-data');

const UserService = {

    /* only for testing */
    test: () => {
        console.log('only test user service method');
    }

};


module.exports = UserService;