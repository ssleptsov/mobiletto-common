"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.setLogLevel = exports.logger = exports.M_SPECIAL = exports.M_LINK = exports.M_DIR = exports.M_FILE = exports.closeStream = exports.writeStream = exports.readStream = exports.isReadable = exports.isAsyncGenerator = exports.MobilettoNotFoundError = exports.MobilettoError = void 0;
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const logger_js_1 = require("./logger.js");
class MobilettoError extends Error {
    constructor(message, err) {
        super(`${message}: ${err ? err : ""}`);
        this.err = err;
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
const isAsyncGenerator = (func) => func[Symbol.toStringTag] === "AsyncGenerator";
exports.isAsyncGenerator = isAsyncGenerator;
const isReadable = (thing) => thing instanceof fs_1.default.ReadStream ||
    thing instanceof stream_1.Transform ||
    thing instanceof stream_1.Readable;
exports.isReadable = isReadable;
function readStream(stream, callback, endCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const counter = { count: 0 };
        const streamHandler = (stream) => new Promise((resolve, reject) => {
            stream.on("data", (data) => {
                counter.count += data ? data.length : 0;
                callback(data);
            });
            stream.on("error", reject);
            stream.on("end", () => {
                if (endCallback) {
                    endCallback();
                }
                resolve();
            });
        });
        yield streamHandler(stream);
        return counter.count;
    });
}
exports.readStream = readStream;
function writeStream(stream) {
    return (chunk) => {
        if (chunk) {
            stream.write(chunk, (err) => {
                if (err) {
                    logger_js_1.logger.error(`writeStream: error writing: ${err}`);
                    throw err;
                }
            });
        }
    };
}
exports.writeStream = writeStream;
function closeStream(stream) {
    return () => stream.close((err) => {
        if (err) {
            logger_js_1.logger.error(`closeStream: error closing: ${err}`);
            throw err;
        }
    });
}
exports.closeStream = closeStream;
exports.M_FILE = "file";
exports.M_DIR = "dir";
exports.M_LINK = "link";
exports.M_SPECIAL = "special";
exports.logger = logger_js_1.logger;
var logger_js_2 = require("./logger.js");
Object.defineProperty(exports, "setLogLevel", { enumerable: true, get: function () { return logger_js_2.setLogLevel; } });
