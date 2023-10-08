import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../errorHandler/errorHandler";

export interface CustomRequest extends Request {
    user: {
        id: number,
        email: string
    },
    token: string
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization

    if (!token) {
        errorHandler({ message: "not authorized" }, res, 401)
    } else {

        jwt.verify(token, "jwt", (err: any, user: any) => {
            if (err) {
                errorHandler({ message: "Invalid token" }, res, 403)
            }

            console.log("user **", user);
            (req as CustomRequest).user = { id: user.id, email: user.email };
            next();
        })
    }
}