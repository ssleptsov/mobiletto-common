export declare class MobilettoError extends Error {
    private readonly err;
    constructor(message: string, err?: any);
}
export declare class MobilettoNotFoundError extends Error {
    private readonly id;
    constructor(id: any);
}
export declare const isAsyncGenerator: (func: any) => boolean;
export declare const isReadable: (thing: any) => boolean;
export declare function readStream(stream: any, callback: (data: any[]) => void, endCallback: () => void): Promise<number>;
export declare function writeStream(stream: any): (chunk: any) => void;
export declare function closeStream(stream: any): () => any;
export declare const M_FILE = "file";
export declare const M_DIR = "dir";
export declare const M_LINK = "link";
export declare const M_SPECIAL = "special";
export type MobilettoEntryType = "file" | "dir" | "link" | "special";
export declare const logger: import("winston").Logger;
export { setLogLevel } from "./logger.js";
