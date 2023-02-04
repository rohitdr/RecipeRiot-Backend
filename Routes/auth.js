
const express = require('express')
const router = express.Router();
const User = require('../Modals/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser.js');
const jwtSecret = "adlksfjakghaslkdfj"

//crate user no login required
router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('phone_number').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let emailcheck = await User.findOne({ 'email': req.body.email });
        if (emailcheck) {
            return res.status(400).json({ 'error': "Sorry user already exists with this email" })
        }
        let numberCheck = await User.findOne({ 'phone_number': req.body.phone_number })
        if (numberCheck) {
            return res.status(400).json({ 'error': "Sorry user already exists with this phone Number" })
        }
        const salt = await bcrypt.genSalt(10);
        const securedpass = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: securedpass
        })
        const data = {
            id: user.id
        }
        const auth_token = jwt.sign(data, jwtSecret);

        res.json({ auth_token })


    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})


//login of user login not  required

router.post('/login', [
    body('email', 'Enter a correct email').isEmail(),
    body('password', "password can't be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ 'error': "Sorry user does not exist" })
        }
        let passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ 'error': "Please use correct correndentials" })
        }
        const data = {
            id: user.id
        }
        const auth_token = jwt.sign(data, jwtSecret)
        res.json({ auth_token })

    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})

//get user details login required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select("-password")
        res.json(user)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})
module.exports = router;