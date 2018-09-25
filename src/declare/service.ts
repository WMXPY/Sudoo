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

export enum ARGUMENT_TYPE {
    STRING = 'STRING',
    PATH = 'PATH',
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
}

export interface IArgumentPattern {
    match?: (arg: string) => string | null;
    name: string;
    optional?: boolean;
    type: ARGUMENT_TYPE;
}

export enum ARGUMENT_INTELLIGENCE_TYPE {
    DESCRIPTION = 'DESCRIPTION',
    AUTOCOMPLETE = 'AUTOCOMPLETE',
}

export interface IArgumentIntelligenceResult {
    autocomplete?: string;
    description?: string;
}

export interface IService {
    readonly commands: string[];
    readonly pattern: IArgumentPattern[];

    readonly disabled?: boolean;

    execute: (args: string[], env: IPathEnvironment) => END_SIGNAL;
    intelligence: (key: string, input: string) => IArgumentIntelligenceResult;
}

export abstract class AbstractService implements IService {
    public abstract readonly commands: string[];
    public abstract readonly pattern: IArgumentPattern[];

    public readonly disabled?: boolean;

    public abstract execute(args: string[]): END_SIGNAL;
    public intelligence(key: string, input: string): IArgumentIntelligenceResult {
        return {};
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
