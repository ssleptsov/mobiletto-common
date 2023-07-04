/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs";
import { Readable, Transform } from "stream";
import { logger as log } from "./logger.js";

export class MobilettoError extends Error {
  private readonly err: any;
  constructor(message: string, err?: any) {
    super(`${message}: ${err ? err : ""}`);
    this.err = err;
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
  }
}

export class MobilettoNotFoundError extends Error {
  private readonly id: any;
  constructor(id: any) {
    super(`MobilettoNotFoundError: ${id}`);
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
  }
}

export const isAsyncGenerator = (func: any) =>
  func[Symbol.toStringTag] === "AsyncGenerator";
export const isReadable = (thing: any) =>
  thing instanceof fs.ReadStream ||
  thing instanceof Transform ||
  thing instanceof Readable;

export async function readStream(
  stream: any,
  callback: (data: any[]) => void,
  endCallback: () => void
) {
  const counter = { count: 0 };
  const streamHandler = (stream: any) =>
    new Promise<void>((resolve, reject) => {
      stream.on("data", (data: any) => {
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
  await streamHandler(stream);
  return counter.count;
}

export function writeStream(stream: any) {
  return (chunk: any) => {
    if (chunk) {
      stream.write(chunk, (err: Error | null | undefined) => {
        if (err) {
          log.error(`writeStream: error writing: ${err}`);
          throw err;
        }
      });
    }
  };
}

export function closeStream(stream: any) {
  return () =>
    stream.close((err: Error | null | undefined) => {
      if (err) {
        log.error(`closeStream: error closing: ${err}`);
        throw err;
      }
    });
}

export const M_FILE = "file";
export const M_DIR = "dir";
export const M_LINK = "link";
export const M_SPECIAL = "special";

export const logger = log;
export { setLogLevel } from "./logger.js";
