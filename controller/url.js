const shortid = require("shortid");
const user = require("./../models/user");
const URL = require("./../models/url");


async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Check if the URL already exists in the database
  const existingURL = await URL.findOne({ redirectURL: body.url });
  if (existingURL) {
    return res.json({ message: "Shortened URL already exists!!", url: existingURL.shortId });
  }

  let shortId;
  let isUnique = false;

  // Generate a unique short ID
  while (!isUnique) {
    shortId = `bitly${shortid(8)}`;
    const existingShortId = await URL.findOne({ shortId: shortId });
    if (!existingShortId) {
      isUnique = true;
    }
  }

  // Create the new URL entry in the database
  const url = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  // If the user is logged in, update their record with the new URL
  if (req.user != null) {
    try {
      const userData = await user.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            shortURL: url._id,
          },
        },
        { new: true }
      );

      if (!userData) {
        console.log("User not found.");
      } else {
        console.log("User data updated successfully:", userData);
      }
    } catch (error) {
      return res.json({ error: 1 });
    }
  }

  return res.json({ url: shortId, redirect: body.url });
}


async function handleRedirectURL(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOneAndUpdate(
    { shortId: shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(result.redirectURL);
}

async function handleGetAnalyticsURL(req, res) {
  const shortID = req.params.shortID;
  // console.log(shortID);

  const result = await URL.findOne({ shortId: shortID });

  res.json({
    totalClick: result.visitHistory.length,
    analytics: result,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleGetAnalyticsURL,
};
