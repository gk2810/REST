import { Request, Response, response } from "express"
import bcrypt from "bcrypt";
import db from "../model/index";
import jwt from "jsonwebtoken";
import axios from "axios";
import { errorHandler } from "../errorHandler/errorHandler";

let User = db.User;

export async function signup(req: Request, res: Response) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let user = await User.create({
            ...req.body
        })
        res.status(200).send(user)
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}

export async function login(req: Request, res: Response) {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            errorHandler({ message: "data is missing" }, res, 400)
        }
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
            errorHandler({ message: "user not found" }, res, 404)
        } else {
            let iscompared = bcrypt.compareSync(password, user.dataValues.password)
            if (iscompared) {
                let token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email }, "jwt");
                res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 })
                return res.status(200).json({ token: token })
            } else {
                errorHandler({ message: "password is incorrect" }, res, 400)
            }
        }
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}

export interface CustomRequest extends Request {
    user: {
        id: number,
        email: string
    }
}

export async function profile(req: Request, res: Response) {
    try {
        let user = (req as CustomRequest).user
        let User = await db.User.findOne({
            where: {
                id: user.id
            }
        })
        return res.status(200).json({ user: User })
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}

export async function joke(req: Request, res: Response) {
    try {
        let joke = await axios.get("https://api.chucknorris.io/jokes/random")
        if (joke?.data?.value) {
            return res.status(200).json({ joke: joke.data.value })
        } else {
            errorHandler({ message: "something bad happen" }, res, 400)
        }
    } catch (error) {
        console.log("Error ", error);
        errorHandler(error, res, 500)
    }
}

export async function logout(req: Request, res: Response) {
    try {
        let token = req.headers.cookie?.split("jwt")[1]
        if (!token) {
            return res.status(400).json({ msg: "bad request token is not present in coockie" })
        }
        res.status(200).json({ "msg": "user logout successful" })
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}