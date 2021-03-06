'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dogparksSchema = mongoose.Schema({
    parkName: 'String',
    parkImage: 'String',
    parkCity: 'String',
    parkState: 'String'
});

dogparksSchema.methods.serialize = function() {
    return {
        parkName: this.parkName,
        parkImage: this.parkImage,
        parkCity: this.parkCity,
        parkState: this.parkState    
    };
};

const Dogparks = mongoose.model("dogpark", dogparksSchema);

module.exports = {Dogparks};