import { LogType } from "consola/core";
export declare const logLevel: (level: LogType) => number;
export declare const logger: import("consola/dist/core").ConsolaInstance;
export declare const setLogLevel: (level: LogType | string) => void;
