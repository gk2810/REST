import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorHandler } from "../errorHandler/errorHandler";

export async function loginSchema(req: Request, res: Response, next: NextFunction) {
    try {
        let schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        await schema.validateAsync(req.body).then(result => next()).catch((error) => {
            console.log("error ", error);
            errorHandler(error, res, 400)
        })
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}