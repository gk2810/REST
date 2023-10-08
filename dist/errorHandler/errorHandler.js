"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, res, status) {
    return res.status(status).json({ "msg": error.message });
}
exports.errorHandler = errorHandler;
