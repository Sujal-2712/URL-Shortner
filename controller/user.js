const user = require("./../models/user");
const url = require("./../models/url");

async function handleUserSignup(req, res) {
    const { email, password, cpassword } = req.body;

    try {
        if (password === cpassword) {
            await user.create({
                email: email,
                password: password,
            });

            res.json({ message: "User created", error: 0 });
        } else {
            res.json({ message: "Passwords are not matched", error: 1 });
        }
    } catch (error) {
        res.json({ message: "Email ID is already exists!!", error: 1 });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const result = await user.findOne({ email: email });
        if (result.password === password) {
            const token = await result.generateAuthToken();
            console.log("Generated Token:", token);

            req.token = token;

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 750000),
            });

            res.json({ message: "Successfully Login", error: 0 });
        } else {
            res.json({ message: "Invalid Email or Password", error: 1 });
        }
    } catch (error) {
        res.json({ message: "Invalid Email or Password", error: 1 });
    }
}

async function renderProfile(req, res) {
    if (req.user == null) {
        return res.redirect("/login");
    }
    try {
        const User = await user.findOne({ _id: req.user._id }).populate("shortURL");
        return res.render("profile", { data: User });
    } catch (error) {
        res.send(error);
    }
}

async function deleteURL(req, res) {
    let id = req.query.shortId;
    let userid = req.query.userid;

    try {
        // Find the URL entry by shortId
        const urlData = await url.findOne({ shortId: id });

        if (!urlData) {
            return res.json({ message: "URL not found", error: 1 });
        }

        let objId = urlData._id;

        // Remove the URL from the user's shortURL list
        const userData = await user.findByIdAndUpdate(
            userid,
            {
                $pull: { shortURL: objId }
            },
            { new: true } // Option to return the modified document
        );

        if (!userData) {
            return res.json({ message: "User not found", error: 1 });
        }

        // Delete the URL entry from the URL collection
        await url.deleteOne({ _id: objId });

        res.json({ message: "URL Deleted Successfully!!", error: 0 });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.json({ message: "Error in Deletion", error: 1 });
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    renderProfile,
    deleteURL,
};
