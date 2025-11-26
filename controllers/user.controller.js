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

            res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
            });
            
            res.status(200).json({ 
                message: 'Login successful', 
                data: { 
                    id: findUser._id,
                    username: findUser.username, 
                    email: findUser.email } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    me: async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ user: null });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // Cari user di database untuk dapatkan data lengkap
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.json({ user: null });
        
        res.json({
        user: {
            id: user._id,
            name: user.name,        
            username: user.username, 
            email: user.email       
        }
        });
    } catch (e) {
        res.clearCookie("token");
        res.json({ user: null });
    }
    },

    logout: (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        res.json({ message: "Logout successful" });
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Helper: upload buffer ke Cloudinary
    uploadStream: (buffer, folder = 'avatars') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
        { folder, format: 'jpg' },
        (error, result) => {
            if (error) reject(error);
            else resolve(result);
        }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
    },

    updateProfile: async (req, res) => {
    const { name, username, email } = req.body;
    const userId = req.user.id;

    try {
        // Validasi unik (kecuali milik diri sendiri)
        if (username) {
        const existing = await User.findOne({ username, _id: { $ne: userId } });
        if (existing) return res.status(400).json({ message: 'Username sudah digunakan' });
        }
        if (email) {
        const existing = await User.findOne({ email, _id: { $ne: userId } });
        if (existing) return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;

        const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
        }).select('-password');

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    },

    uploadAvatar: async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
    }

    try {
        const result = await uploadStream(req.file.buffer, 'avatars');
        const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: result.secure_url },
        { new: true }
        ).select('-password');

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Avatar upload failed', error: error.message });
    }
    },

    changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }

    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: 'Password lama salah' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: 'Password berhasil diubah' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },

    deleteProfile: async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        });
        res.status(200).json({ message: 'Akun berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
