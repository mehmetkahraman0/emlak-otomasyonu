import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {

    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        throw new Error("lütfen bilgilerinizi eksiksiz giriniz.")
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send("kullanıcı zaten kayıtlı.");
        return;
    }

    const newUser = new User({ username, email, password, isAdmin });

    try {
        await newUser.save();
        try {
            var token = createToken(res, newUser._id);

        } catch (error) {
            console.log(error);
        }
        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            olusturulanToken : token
        });
    } catch (error) {
        res.status(400);
        throw new Error("kullanıcı kayıt edilemedi.")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send("bilgileri eksiksiz giriniz.");
        return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        if (userExists.password === password) {
            createToken(res, userExists._id);
            res.status(201).json({
                _id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                isAdmin: userExists.isAdmin
            });
        } else {
            res.status(400).send("şifre hatalı.");
            return;
        }
    } else {
        res.status(400).send("kullanıcı bulunamdı.");
        return;
    }

})

const updateCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updateUser = await user.save();

        res.status(201).json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            password: updateUser.password
        })
    } else {
        res.status(404).send("kullanıcı bulunamadı. ")
    }

})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            username: user.username,
            email: user.email,
            password: user.password,
        });
    } else {
        res.status(400);
        throw new Error("kullanıcı bulunamadı.");
    }
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).send("Çıkış işlemi başarılı.");
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export { createUser, loginUser, updateCurrentUser, getCurrentUser, logoutCurrentUser, getAllUsers };