"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
//**********************************Error middleware *********************************/
const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success: false,
        err: err.message
    });
};
exports.error = error;
//# sourceMappingURL=errorMiddleWare.js.map