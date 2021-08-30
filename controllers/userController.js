const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    User.findOne({ username: req.body.username }).exec(async (error, user) => {
        if(user)
        return res.status(400).json({
            message: "User already registered"
        })

        const { username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)

        const _user = new User({
            username,
            hashPassword
        })

        _user.save((error, data) => {
            if(error) {
                return res.status(400).json({
                    message: 'Something Went Wrong',
                    error: error
                })
            }

            if(data) {
                return res.status(201).json({
                    message: "User created successfully",
                    data: data
                })
            }
        })
    })
}

exports.login = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.hashPassword)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        const {_id, username } = user;
       
        res.status(200).json({
            token,
            user: {_id, username }
        })
    } else {
       res.status(400).json({ message: 'Invalid Password' });
    }
}

exports.sigin = (req, res) => {
    User.findOne({ username: req.body.username })
    .exec((error, user) => {
        if(error) return res.status(400).json({error})
        if (user) {
            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET)
                const { _id, username } = user;
                res.status(200).json({
                    token,
                    user: {_id, username }
                })
            } else {
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        } else {
            return res.status(400).json({ message: 'Something error occured'});
        }
    })
}