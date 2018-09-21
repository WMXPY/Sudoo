/**
 * @author WMXPY
 * @namespace Common_Agent
 * @fileoverview Interface
 */

export interface IAgent {
    press: (str: string, key: IInput) => IAgent;
    listen: (executable: (key: IInput) => void) => IAgent;
}

export interface IInput {
    sequence: string;
    name?: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
}
