/**
 *  Write the logic and database crud operation for User goes here in Service Layer.
 */
const User = require('../models/User');
const responseDataUtil = require('../models/response-data');

const UserService = {

    /* only for testing */
    test: () => {
        console.log('only test user service method');
    },

    /**
     * Create  a new User
     * @param userData
     * @returns {Promise<*>}
     */
    createUser: async (userData) => {
        let responseData = null;
        let userModel = UserService.convertToModel(userData);

        let existingUserModel = await User.findOne({personalId: userModel.personalId});
        // Check user exist or not
        if (existingUserModel) {
            responseData = responseDataUtil
                .create(400, false, 'User already exist and check personal id.',
                    existingUserModel);
            return responseData;
        }

        //save when user does not exist.
        await userModel.save()
            .then(function (savedUserModel) {
                responseData = responseDataUtil.create(200, true, "User Created.", savedUserModel);
            })
            .catch((err) => {
                console.log(err);
                responseData = responseDataUtil.create(500, false, 'An Error Occured');
            });
        return responseData;
    },

    /**
     * Create  Get all users in system
     * @returns {Promise<*>}
     */
    findAllUser: async () => {
        let responseData = null;
        await User.find({})
            .then(function (users) {
                responseData = responseDataUtil.create(200, true, "Found Users.", users);
            })
            .catch((err) => {
                console.log("Error in findAllEvents", err);
                responseData = responseDataUtil.createDefaultError();
            });
        return responseData;
    },

    /**
     * Find one by Id
     * @param id
     * @returns {Promise<*>}
     */
    findOneById: async (id) => {
        let responseData = null;
        await User.findById(id)
            .then(function (user) {
                responseData = responseDataUtil.create(200, true, "Found Users.", user);
            })
            .catch((err) => {
                console.log("Error in findAllEvents", err);
                responseData = responseDataUtil.createDefaultError();
            });
        return responseData;
    },

    /**
     * Find one by parameters
     * @param id
     * @returns {Promise<*>}
     */
    findByParams: async (personalId) => {
        let responseData = null;
        await User.find({personalId: personalId})
            .then(function (user) {
                responseData = responseDataUtil.create(200, true, "Found Users.", user);
            })
            .catch((err) => {
                console.log("Error in findAllEvents", err);
                responseData = responseDataUtil.createDefaultError();
            });
        return responseData;
    },


    /* User data validation and convert into Model */
    convertToModel(userData) {
        return new User({
            name: userData.name,
            contactNo: userData.contactNo,
            personalId: userData.personalId
        });
    }

};


module.exports = UserService;