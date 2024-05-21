import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirect: {
        type: String,
        required: true
    },
    totalclicks: [{
        timestamp: {
            type: Number, 
            required: true 
        }
    }]
}, { timestamps: true }); 

const Url = mongoose.model('Url', urlSchema); 

export default Url;
