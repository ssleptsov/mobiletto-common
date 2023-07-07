export class MobilettoError extends Error {
    private readonly err?: Error;
    constructor(message: string, err?: Error) {
        super(`${message}: ${err ? err : ""}`);
        this.err = err;
        this.stack = err && err.stack ? err.stack : new Error().stack;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (this as any).__proto__ = actualProto;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
    }
}

export class MobilettoNotFoundError extends Error {
    private readonly id: any;
    constructor(id: any) {
        super(`MobilettoNotFoundError: ${id}`);
        this.stack = new Error().stack;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (this as any).__proto__ = actualProto;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
    }
}
