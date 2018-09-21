/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Interface
 */

export enum END_SIGNAL {
    SUCCEED = 0,
    FAILED = 1,
}

export interface IService {
    readonly command?: string;

    execute: (args: string[]) => END_SIGNAL;
}
