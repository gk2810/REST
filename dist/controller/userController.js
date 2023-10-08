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
exports.logout = exports.joke = exports.profile = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../model/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const errorHandler_1 = require("../errorHandler/errorHandler");
let User = index_1.default.User;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
            let user = yield User.create(Object.assign({}, req.body));
            res.send(user);
        }
        catch (error) {
            console.log("error ", error);
            (0, errorHandler_1.errorHandler)(error, res, 500);
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                (0, errorHandler_1.errorHandler)({ message: "data is missing" }, res, 400);
            }
            let user = yield User.findOne({ where: { email: email } });
            if (!user) {
                (0, errorHandler_1.errorHandler)({ message: "user not found" }, res, 404);
            }
            else {
                let iscompared = bcrypt_1.default.compareSync(password, user.dataValues.password);
                if (iscompared) {
                    let token = jsonwebtoken_1.default.sign({ id: user.dataValues.id, email: user.dataValues.email }, "jwt");
                    res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 });
                    return res.status(200).json({ token: token });
                }
                else {
                    (0, errorHandler_1.errorHandler)({ message: "password is incorrect" }, res, 400);
                }
            }
        }
        catch (error) {
            console.log("error ", error);
            (0, errorHandler_1.errorHandler)(error, res, 500);
        }
    });
}
exports.login = login;
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = req.user;
            let User = yield index_1.default.User.findOne({
                where: {
                    id: user.id
                }
            });
            return res.status(200).json({ user: User });
        }
        catch (error) {
            console.log("error ", error);
        }
    });
}
exports.profile = profile;
function joke(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let joke = yield axios_1.default.get("https://api.chucknorris.io/jokes/random");
            if ((_a = joke === null || joke === void 0 ? void 0 : joke.data) === null || _a === void 0 ? void 0 : _a.value) {
                return res.status(200).json({ joke: joke.data.value });
            }
            else {
                return res.status(400).json({ msg: "something bad happen" });
            }
        }
        catch (error) {
            console.log("Error ", error);
        }
    });
}
exports.joke = joke;
function logout(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("jwt")[1];
            if (!token) {
                return res.status(400).json({ msg: "bad request token is not present in coockie" });
            }
            res.status(200).json({ "msg": "user logout successful" });
        }
        catch (error) {
            console.log("error ", error);
        }
    });
}
exports.logout = logout;
