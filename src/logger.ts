import { createConsola, LogType, LogLevels } from "consola/core";

export const logLevel = (level: LogType): number => (level && LogLevels[level] ? LogLevels[level] : LogLevels["warn"]);

export const logger = createConsola({
    level: logLevel(process?.env?.MOBILETTO_LOG_LEVEL as LogType),
    reporters: [
        {
            log: (logObj) => {
                console.log(JSON.stringify(logObj));
            },
        },
    ],
});

export const setLogLevel = (level: LogType | string) => {
    logger.level = logLevel(level as LogType);
};
