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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: "not authorized" });
        }
        jsonwebtoken_1.default.verify(token, "jwt", (err, user) => {
            if (err) {
                return res.status(403).json({ msg: "Invalid token" });
            }
            console.log("user **", user);
            // req["user"] = user
            req.user = { id: user.id, email: user.email };
            // req.header("user") = user;
            next();
        });
        let decoded = jsonwebtoken_1.default.decode(token);
        console.log("decoded", decoded);
    });
}
exports.authenticate = authenticate;
