import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        url: String,
        public_id: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        created_at: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, { timestamps: true });

export default model('Post', postSchema);
