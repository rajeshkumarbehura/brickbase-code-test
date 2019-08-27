const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        personalId: {type: String, required: true},
        contactNo: {type: Number, required: true}
    },
    {
        timestamps: true,
    },
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
