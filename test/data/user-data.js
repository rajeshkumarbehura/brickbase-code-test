const User = require('../../src/models/User');

module.exports = {

    userJson:
        {
            "name": "rajesh",
            "contactNo": 9004453,
            "personalId": "1234",
        },

    invalidUserJson:
        {
            "name": "rajesh",
            "contactNo": 9004453,
        },


    userModel: () => {
        return new User({
            "name": "rajesh",
            "contactNo": 9004453,
            "personalId": "1234",
        });
    },

};
