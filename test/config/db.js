const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/myapp';

const mockgoose = new Mockgoose(mongoose);

function connect() {
    return new Promise((resolve, reject) => {
        mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true})
                    .then((res, err) => {
                        console.log('Mock mongodb connected.')
                        if (err) return reject(err);
                        resolve();
                    })
            })

    });
}

function close() {
    console.log('Mock mongodb closed.')
    return mongoose.disconnect();
}

module.exports = {connect, close};