import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";
import bodyParser from 'body-parser';
//const { json } = bodyParser;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn: "2min"});
};

// Function to create refresh token
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET_REF_KEY, {
      expiresIn: "7d",
    });
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
   // console.log("Email is :",email);
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist!" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        res.json({data:user,  success: true, token });
        // res.status(200).json({
        //     message: "Login successfullyhgfhgf",
        //     data: {
        //       token,
        //       refreshToken,
        //       user: {
        //         name: user.name,
        //         email: user.email,
                
        //       },
        //     },
        //     success: true,
        //     error: false,
        //   });

          console.log(res.data.data);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired, please log in again' });
        }
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email " });
        }
        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be at least 8 characters long" });
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // Create a new user
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });
        // Save the user to the database
        const user = await newUser.save();


        // Create and return JWT token
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        res.json({ success: true, token });
        // res.status(200).json({
        //     message: "Register successfullyhgfhgf",
        //     data: {
        //       token,
        //       refreshToken,
        //       user: {
        //         name: user.name,
        //         email: user.email,
        //       },
        //     },
        //     success: true,
        //     error: false,
        //   });



    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const getUserInfo = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format

    if (!token) {
        return res.json({ success: false, message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Invalid token' });
    }
};
const updateUserInfo = async (req, res) => {
    const { name } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.name = name || user.name; // Update name if provided
        await user.save();

        res.json({ success: true, message: "User info updated", data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error updating user info" });
    }
};
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcryptjs.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: "New password should be at least 8 characters long" });
        }

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error updating password" });
    }
};



export { loginUser, registerUser,getUserInfo,updateUserInfo,changePassword};
