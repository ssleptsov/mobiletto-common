"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogTransports = exports.setLogLevel = exports.logger = void 0;
const winston = __importStar(require("winston"));
exports.logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: process.env.MOBILETTO_LOG_LEVEL || "error",
    format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), winston.format.printf((info) => {
        return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
    })),
    transports: process.env.MOBILETTO_LOG_FILE
        ? [
            new winston.transports.File({
                filename: process.env.MOBILETTO_LOG_FILE,
            }),
        ]
        : [
            new winston.transports.Console({
                stderrLevels: Object.keys(winston.config.npm.levels),
            }),
        ],
});
const setLogLevel = (level) => {
    exports.logger.level = level;
};
exports.setLogLevel = setLogLevel;
const setLogTransports = (transports) => {
    exports.logger.transports.splice(0, exports.logger.transports.length);
    exports.logger.transports.push(...transports);
};
exports.setLogTransports = setLogTransports;
