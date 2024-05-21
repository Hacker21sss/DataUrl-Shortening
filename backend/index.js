import express from 'express';
import connectDb from './db.js';
import urlroute from './routes/url.js';
import URL from './model/url.js';
import cors from "cors";
import authrouter from "./routes/authroutes.js"


const app = express();
app.use(cors());



const PORT = process.env.PORT || 3000;
const MONGODB_URL = 'mongodb://localhost:27017/min-url';


app.use(express.json());


app.use('/url', urlroute);


app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    totalclicks: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        
        res.redirect(entry.redirect);
    } catch (error) {
        console.error('Error retrieving URL:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.use('/api/auth',authrouter);


connectDb(MONGODB_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });
