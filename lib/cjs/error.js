"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilettoNotFoundError = exports.MobilettoError = void 0;
class MobilettoError extends Error {
    constructor(message, err) {
        super(`${message}: ${err ? err : ""}`);
        this.err = err;
        this.stack = err && err.stack ? err.stack : new Error().stack;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
    }
}
exports.MobilettoError = MobilettoError;
class MobilettoNotFoundError extends Error {
    constructor(id) {
        super(`MobilettoNotFoundError: ${id}`);
        this.stack = new Error().stack;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
    }
}
exports.MobilettoNotFoundError = MobilettoNotFoundError;
