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

export enum DATA_TYPE {
    STRING = 'STRING',
    PATH = 'PATH',
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
}

export interface IArgumentPattern {
    match?: (arg: string) => string | null;
    name: string;
    optional?: boolean;
    type: DATA_TYPE;
}

export interface IOptionPattern {
    match?: (arg: string) => string | null;
    option: string[];
    name: string;
    type: DATA_TYPE;
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

    execute: (props: any, env: IPathEnvironment) => END_SIGNAL;
    intelligence: (key: string, input: string) => IArgumentIntelligenceResult;
}

export abstract class AbstractService<IProps> implements IService {
    public abstract readonly commands: string[];
    public abstract readonly pattern: IArgumentPattern[];

    public readonly disabled?: boolean;

    public abstract execute(props: IProps, env: IPathEnvironment): END_SIGNAL;
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
