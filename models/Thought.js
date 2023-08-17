const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, min: 1, max: 280 },
        createdAt: { tpye: Date, default: new Date(), get: format },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false,
    }
);

function format() {                  //NEED TO FINISH THIS
    return .toDateString();
};

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;