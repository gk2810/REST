import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { errorHandler } from "../errorHandler/errorHandler";

export async function userSchema(req: Request, res: Response, next: NextFunction) {
    try {
        let schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone_number: Joi.number()
        })

        schema.validateAsync(req.body).then(result => next()).catch((err) => {
            console.log("err ", err);
            errorHandler(err, res, 500)
        });
    } catch (error) {
        console.log("error ", error);
        errorHandler(error, res, 500)
    }
}