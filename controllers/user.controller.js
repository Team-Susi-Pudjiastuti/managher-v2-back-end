const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        const { name, username, email, password } = req.body;
        try {
            if (!name || !username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                return res.status(400).json({ message: 'Username can only contain letters and numbers' });
            }

            const findUser = await User.findOne({ email });
            if (findUser) {
                return res.status(400).json({ message: 'Email already registered' }); 
            }

            const findUsername = await User.findOne({ username });
            if (findUsername) {
                return res.status(400).json({ message: 'Username already registered' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const newUser = await User.create({ name, username, email, password: hash });
            res.status(201).json(
                { 
                    message: 'User registered successfully', 
                    data: newUser
                });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const findUser = await User.findOne({ username });
            
            if (!findUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = bcrypt.compareSync(password, findUser.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            } 
            
            const token = jwt.sign({ 
                id: findUser._id,
                name: findUser.name,
                username: findUser.username,
                email: findUser.email
            }, process.env.JWT_SECRET, { 
                expiresIn: '1d' 
            });
            
            res.status(200).json({ 
                token,
                message: 'Login successful', 
                data: { 
                    id: findUser._id,
                    username: findUser.username, 
                    email: findUser.email } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // getProfile: async (req, res) => {
    //     try {
    //         const user = await UserModel.findById(req.params.id);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },

    // updateProfile: async (req, res) => {
    //     try {
    //         const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },

    // deleteProfile: async (req, res) => {
    //     try {
    //         const user = await UserModel.findByIdAndDelete(req.params.id);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         res.status(200).json({ message: 'User deleted' });
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },
}
