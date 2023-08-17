const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: ObjectId, unique: true },
        reactionBody: { type: String, required: true, max: 280 },
        username: { type: String, required: true },
        createdAt: { tpye: Date, default: new Date(), get: format },
    }
);

function format() {                  //NEED TO FINISH THIS
    return .toDateString();
};

module.exports = reactionSchema;