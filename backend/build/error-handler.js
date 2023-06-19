"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errLog = exports.customErr = void 0;
const customErr = (err, req, res, next) => {
    if (err.code && err.msg) {
        res.status(err.code).send({ msg: err.msg });
    }
    else {
        next(err);
    }
};
exports.customErr = customErr;
const errLog = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error!" });
};
exports.errLog = errLog;
