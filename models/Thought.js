const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
    {
      reactionId: {
        // Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId(),
      },
  
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
  
      username: {
        type: String,
        required: true,
      },
  
      createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (timestamp) => dateFormat(timestamp),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, min: 1, max: 280 },
        createdAt: { tpye: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;