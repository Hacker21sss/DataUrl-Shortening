// import shortId from "shortid";
// import URL from "../model/url.js";

// async function generateShortUrl(req, res) {
//   const body = req.body;
//   if (!body.url) return res.status(400).json({ error: 'url is required' });

//   const shortID = shortId();
//   try {
//     await URL.create({
//       shortId: shortID,
//       redirect: body.url,
//       totalclicks: [],
//     });

//     return res.json({ id: shortID });
//   } catch (error) {
//     console.error('Error saving URL to database:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// export { generateShortUrl };



import Url from '../model/url.js';
import shortid from 'shortid';

export const generateShortUrl = async (req, res, next) => {
  try {
    const { redirect } = req.body;
    const userId = req.user.userId;

    if (!redirect) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const shortId = shortid.generate();
    const newUrl = await Url.create({ userId, redirect, shortId });

    res.status(201).json(newUrl);
  } catch (error) {
    next(error);
  }
};

export const getUserUrls = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const urls = await Url.find({ userId });

    res.status(200).json(urls);
  } catch (error) {
    next(error);
  }
};
