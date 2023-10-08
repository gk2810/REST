import express from "express";
// import createNote, { getNote, updateNote, deletenote } from "../controller/noteController";
import { signup, login, profile, joke, logout } from "../controller/userController";
import { authenticate } from "../middleware/user_authenticate"
import { userSchema } from "../middleware/userSchema";
import { loginSchema } from "../middleware/loginSchema"

let Router = express.Router();

Router.post('/users/signup', userSchema, signup);
Router.post('/users/login', loginSchema, login);
Router.get('/users/me', authenticate, profile)
Router.get('/random-joke', authenticate, joke)
Router.get('/users/logout', authenticate, logout)
// Router.patch('/Note/:id/:title', updateNote)
// Router.delete('/Note/:id', deletenote)

export default Router