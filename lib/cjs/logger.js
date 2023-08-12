"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogLevel = exports.logger = exports.logLevel = void 0;
const core_1 = require("consola/core");
const logLevel = (level) => (level && core_1.LogLevels[level] ? core_1.LogLevels[level] : core_1.LogLevels["warn"]);
exports.logLevel = logLevel;
exports.logger = (0, core_1.createConsola)({
    level: (0, exports.logLevel)((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MOBILETTO_LOG_LEVEL),
    reporters: [
        {
            log: (logObj) => {
                console.log(JSON.stringify(logObj));
            },
        },
    ],
});
const setLogLevel = (level) => {
    exports.logger.level = (0, exports.logLevel)(level);
};
exports.setLogLevel = setLogLevel;
