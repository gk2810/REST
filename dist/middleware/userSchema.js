"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const errorHandler_1 = require("../errorHandler/errorHandler");
function userSchema(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let schema = joi_1.default.object({
                name: joi_1.default.string(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
                phone_number: joi_1.default.number()
            });
            schema.validateAsync(req.body).then(result => next()).catch((err) => {
                console.log("err ", err);
                (0, errorHandler_1.errorHandler)(err, res, 500);
            });
        }
        catch (error) {
            console.log("error ", error);
            (0, errorHandler_1.errorHandler)(error, res, 500);
        }
    });
}
exports.userSchema = userSchema;
