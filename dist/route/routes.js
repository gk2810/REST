"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import createNote, { getNote, updateNote, deletenote } from "../controller/noteController";
const userController_1 = require("../controller/userController");
const user_authenticate_1 = require("../middleware/user_authenticate");
const userSchema_1 = require("../middleware/userSchema");
const loginSchema_1 = require("../middleware/loginSchema");
let Router = express_1.default.Router();
Router.post('/users/signup', userSchema_1.userSchema, userController_1.signup);
Router.post('/users/login', loginSchema_1.loginSchema, userController_1.login);
Router.get('/users/me', user_authenticate_1.authenticate, userController_1.profile);
Router.get('/random-joke', user_authenticate_1.authenticate, userController_1.joke);
Router.get('/users/logout', user_authenticate_1.authenticate, userController_1.logout);
// Router.patch('/Note/:id/:title', updateNote)
// Router.delete('/Note/:id', deletenote)
exports.default = Router;
