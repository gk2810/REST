import express from "express";
import Router from "./route/routes";

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', Router)

app.listen(1234, () => {
    console.log('server is running on 1234')
})