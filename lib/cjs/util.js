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
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeStream = exports.writeStream = exports.readStream = exports.isReadable = exports.isAsyncGenerator = void 0;
const fs_1 = require("fs");
const stream_1 = require("stream");
const logger_js_1 = require("./logger.js");
const isAsyncGenerator = (func) => func[Symbol.toStringTag] === "AsyncGenerator";
exports.isAsyncGenerator = isAsyncGenerator;
const isReadable = (thing) => thing instanceof fs_1.ReadStream || thing instanceof stream_1.Transform || thing instanceof stream_1.Readable;
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
