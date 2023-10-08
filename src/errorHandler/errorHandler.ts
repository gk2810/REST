import { Response } from "express"

export function errorHandler(error: any, res: Response, status: number) {
    return res.status(status).json({ "msg": error.message })
}