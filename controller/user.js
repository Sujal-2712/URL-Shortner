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
            res.json({ message: "Invalid ID or Password", error: 1 });
        }
    } catch (error) {
        res.json({ message: "Invalid ID or Password", error: 1 });
    }
}

async function renderProfile(req, res) {
    if (req.user == null) {
        console.log("fdkhfk")
        return res.redirect("/login");
    }
    try {
        console.log("Here")
        const User = await user.findOne({ _id: req.user._id }).populate("shortURL");
        // console.log(User);
        return res.render("profile", { data: User });
    } catch (error) {
        res.send(error);
    }
}

async function deleteURL(req, res) {
    let id = req.query.shortId;
    let userid = req.query.userid;
    console.log(id);
    console.log(userid);

    try {
        const urlData = await url.findOne({ shortId: id });
        let objId = urlData._id;

        const data = await user.findByIdAndUpdate(
            { _id: userid },
            {
                $pull: {
                    shortURL: objId,
                },
            }
        );
        // console.log(data);
        res.json({ message: "URL Deleted Successfully!!", error: 0 });
    } catch (error) {
        res.json({ message: "error in Deletion", error: 1 });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    renderProfile,
    deleteURL,
};
