export declare class MobilettoError extends Error {
    private readonly err?;
    constructor(message: string, err?: Error);
}
export declare class MobilettoNotFoundError extends Error {
    private readonly id;
    constructor(id: any);
}
