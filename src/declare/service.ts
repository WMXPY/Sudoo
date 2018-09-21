/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Service
 */

export enum END_SIGNAL {
    SUCCEED = 0,
    FAILED = 1,
}

export interface IService {
    readonly command: string;

    readonly disabled?: boolean;

    execute: (args: string[]) => END_SIGNAL;
}

export abstract class AbstractService implements IService {
    public abstract readonly command: string;

    public readonly disabled?: boolean;

    public execute(args: string[]): END_SIGNAL {
        return END_SIGNAL.FAILED;
    }
}
