"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logLevel = void 0;
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
exports.logger.isWarningEnabled = () => exports.logger.level >= core_1.LogLevels["warn"];
exports.logger.isNormalEnabled = () => exports.logger.level >= core_1.LogLevels["log"];
exports.logger.isInfoEnabled = () => exports.logger.level >= core_1.LogLevels["info"];
exports.logger.isDebugEnabled = () => exports.logger.level >= core_1.LogLevels["debug"];
exports.logger.isTraceEnabled = () => exports.logger.level >= core_1.LogLevels["trace"];
exports.logger.setLogLevel = (level) => {
    exports.logger.level = typeof level === "number" ? level : (0, exports.logLevel)(level);
};
