const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title : {type:String, required:true },
    content: {type:String, required:true },
    tags : [{type:String}],
    backgroundColor: {type:String, default:"#ffffff"},
    archived : {type:Boolean, default: false },
    trashed:{type:Boolean, default:false},
    createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Note',NoteSchema);
