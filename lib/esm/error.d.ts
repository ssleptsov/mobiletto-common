export declare class MobilettoError extends Error {
    private readonly err?;
    constructor(message: string, err?: any);
}
export declare class MobilettoNotFoundError extends Error {
    private readonly id;
    constructor(id: any);
}
