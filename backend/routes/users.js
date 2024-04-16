const router=require('express').Router();
let User=require('../models/users.model');
const jwt = require('jsonwebtoken');



const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "we need token please provide it."})
    }
    else {
        jwt.verify(token, "our-secret-key", (err, decode) => {
            if (err) {
            return res.json({Message: "Authentication error"})
            }
            else {
                req.name = decode.name;
                req.userid = decode.userid;
                next();
            }
        })
    }
} 
router.get('/', verifyUser, async (req, res) => {
    try {
        // Assuming req.userid is the user's ID after authentication
        const user = await User.findById(req.userid);
        if (!user) {
            return res.json({ message: "User not found", status: false });
        }
        return res.json({ status: true, name: user.name, userid: user.userid });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error fetching user data", status: false });
    }
});


router.post('/register', async (req, res) => {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ userid: req.body.userid }, { email: req.body.email }] });
        if (existingUser) {
            return res.json({ message: "Username or email already exists!", status: false, data: existingUser });
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        return res.json({ message: "User created!", status: true, data: savedUser });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error creating user. Try later", status: false });
    }
});
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
     const user = await User.findOne({ userid: req.body.userid });
        if (!user) {
            return res.json({ message: 'Bad credentials', status: false });
        }

    
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.json({ message: 'Bad credentials', status: false });
        }

        const token = jwt.sign({ name: user.name, userid: user.userid }, "our-secret-key", { expiresIn: "1d" });
        res.cookie('token', token);

        return res.json({ message: "Logging in..", status: true, name: user.name, userid: user.userid });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error logging in. Try later", status: false });
    }
});



router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});


module.exports=router;