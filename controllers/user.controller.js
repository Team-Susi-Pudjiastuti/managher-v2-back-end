const User = require('../models/User');

module.exports = {
    register: async (req, res) => {
        const { name, username, email, password } = req.body;

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const findUsername = await User.findOne({ username });
        if (findUsername) {
            return res.status(400).json({ message: 'Username already registered' });
        }

        try {
            const newUser = await User.create({ name, username, email, password });
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
            if (findUser.password !== password) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            res.status(200).json({ message: 'Login successful', data: { username: findUser.username, email: findUser.email } });
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
