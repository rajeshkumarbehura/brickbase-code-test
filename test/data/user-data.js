const User = require('../../src/models/user');

module.exports = {

    userJson:
        {
            "name": "rajesh",
            "contactNo": 9004453,
            "personalId": "1234",
        },


    userModel: () => {
        return new User({
            "name": "rajesh",
            "contactNo": 9004453,
            "personalId": "1234",
        });
    },

};