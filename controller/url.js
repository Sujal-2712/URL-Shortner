const shortid = require("shortid");
const user = require("./../models/user");
const URL = require("./../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  // console.log(body);
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let shortId = shortid(8);
  shortId=`bitly${shortId}`;
  // console.log(shortId);
 
  const url = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  // console.log(url._id);
  if (req.user != null) {
    console.log(req.user);
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
       return res.json({error:1});
    }
  }
  return res.json({url: shortId, redirect: body.url,error:0 });
}

async function handleGenerateNewShortURL2(req, res) {
  const body = req.body;
  // console.log(body);
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let shortId = shortid(8);
  shortId=`bitly${shortId}`;
  // console.log(shortId);
  const url = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  // console.log(url._id);
  if (req.user != null) {
    // console.log(req.user);
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
      console.log("Error updating user data:", error);
    }
  }

  return res.json({ url: shortId, redirect: body.url });
}

async function handleRedirectURL(req, res) {
  // console.log("Sujal");
  const shortID = req.params.shortID;
  // console.log(shortID);
  const result = await URL.findOneAndUpdate(
    { shortId: shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  // console.log(result);
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
  handleGenerateNewShortURL2
};
