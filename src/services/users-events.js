/**
 *  Write the logic and database crud operation for User and Events goes here in Service Layer.
 */
let User = require('../models/User');
let Event = require('../../src/models/Events');
let responseDataUtil = require('../models/response-data');


const UsersEventsService = {

    /**
     * find all events for a user by  user id
     * @param userId
     */
    findEventsByUserId: async (userId) => {

        let userModel = await User.findById(userId);

        if (!userModel) {
            return responseDataUtil.create(400, false, "User not found.", userModel);
        }

        let eventModels = await Event.find({userId: userId});
        userModel['events'] = eventModels;
        return responseDataUtil.create(200, true, "Events found.",
            UsersEventsService.toResultModel(userModel, eventModels));

    },

    /**
     *  Find all users and their events
     * @returns {Promise<*|{success, statusCode, message}>}
     */
    findEventsForAllUser: async () => {

        // find all users
        let userModels = await User.find({});

        let results = [];
        await Promise.all(userModels.map(async (userModel) => {
            let _eventModels = await Event.find({userId: userModel.id});
            results.push(UsersEventsService.toResultModel(userModel, _eventModels));
        }));

        return responseDataUtil.create(200, true, "Events found.", results);
    },

    /**
     * Custom result  object model to send as response data
     * @param userModel
     * @param eventModels
     * @returns {{_id: *, name: *, personalId: (string|*|personalId|{type, required}), contactNo: (number|contactNo|{type, required}), events: *}}
     */
    toResultModel: (userModel, eventModels) => {
        return {
            _id: userModel._id,
            name: userModel.name,
            personalId: userModel.personalId,
            contactNo: userModel.contactNo,
            events: eventModels
        };
    }

};

module.exports = UsersEventsService;