const mongoose = require('mongoose');

const NotesSchema = new Schema({
    Subject:{
        type: String,
        required: true
    },
    Notes:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
//module.exports = mongoose.model('model name',schema model name)
module.exports = mongoose.model('notes',NotesSchema);