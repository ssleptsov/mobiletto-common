import { LogType, ConsolaInstance } from "consola/core";
export declare const logLevel: (level: LogType) => number;
export type MobilettoLogger = ConsolaInstance & {
    isWarningEnabled: () => boolean;
    isNormalEnabled: () => boolean;
    isInfoEnabled: () => boolean;
    isDebugEnabled: () => boolean;
    isTraceEnabled: () => boolean;
    setLogLevel: (level: LogType | string | number) => void;
};
export declare const logger: MobilettoLogger;
