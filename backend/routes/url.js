import express from "express"
import {generateShortUrl,getUserUrls} from "../controller/url.js";
import authmiddleware from "../middleware/authmiddleware.js"


// const router=express.Router();

// router.post('/',generateShortUrl);
// router.get('/:shortId', async (req, res) => {
//     try {
//       const url = await url.findOne({ shortId: req.params.shortId });
  
//       if (!url) {
//         return res.status(404).json({ message: 'Short URL not found' });
//       }
  
//       // Redirect the user to the long URL
//       res.redirect(url.redirect);
//     } catch (error) {
//       console.error('Error retrieving URL:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  
const router = express.Router();

router.post('/', authmiddleware, generateShortUrl);
router.get('/', authmiddleware, getUserUrls);

export default router;




