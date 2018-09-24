/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Service
 */

export enum END_SIGNAL {
    SUCCEED = 0,
    FAILED = 1,
    MORE_ARGS = 2,
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

// tslint:disable-next-line
export type PatternMap<T> = {
    [key: string]: T;
};

export enum ARGUMENT_TYPE {
    STRING = 'STRING',
    PATH = 'PATH',
    NUMBEr = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
}

export interface IArgumentPattern {
    match?: (arg: string) => string | null;
    optional?: boolean;
    type: ARGUMENT_TYPE;
}

export type ArgPatternMap = PatternMap<IArgumentPattern>;

export interface IService {
    readonly commands: string[];
    readonly pattern: ArgPatternMap;

    readonly disabled?: boolean;

    execute: (args: string[], env: IPathEnvironment) => END_SIGNAL;
}

export abstract class AbstractService implements IService {
    public abstract readonly commands: string[];
    public abstract readonly pattern: ArgPatternMap;

    public readonly disabled?: boolean;

    public execute(args: string[]): END_SIGNAL {
        return END_SIGNAL.FAILED;
    }
}

export interface IPathEnvironment {
    doo?: string;
    su?: string;
    node: string;
    cwd: string;
}

export interface ICommand {
    command: string;
    args: string[];
}
