'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const dogparksSchema = mongoose.Schema({
    userName: 'String',
    parkName: 'String',
    parkImage: 'String',
    parkCity: 'String',
    parkState: 'String'
});

dogparksSchema.methods.serialize = function() {
    return {
        userName: this.userName,
        parkName: this.parkName,
        parkImage: this.parkImage,
        parkCity: this.parkCity,
        parkState: this.parkState    
    };
};

const Dogparks = mongoose.model("dogpark", dogparksSchema);

module.exports = {Dogparks};