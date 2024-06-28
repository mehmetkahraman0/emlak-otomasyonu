import User from "../models/user.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, "alskdfjlkasdfjlksa23123asdlfk");
            req.user = await User.findById(decoded.userId).select("--password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.")
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an admin");
    }
}

export {authenticate, authorizeAdmin};