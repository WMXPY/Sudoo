/**
 * @author WMXPY
 * @namespace Util_String
 * @fileoverview Index
 */

import { ICommand } from "#declare/service";

export const lastElement: <T>(arr: T[]) => T =
    <T>(arr: T[]): T => arr[arr.length - 1];

export const splitInput: (input: string) => string[] =
    (input: string): string[] =>
        (input.match(/\"\S[^\"]*\"|\S+/g) || [])
            .map((str) => str.replace(/\"/g, ''))
            .filter((s: string) => Boolean(s.trim()));

export const spaces = (length: number) => {
    return ' '.repeat(length);
};

export const stringToArgs = (str: string): ICommand => {
    const args: string[] = splitInput(str);
    const command: string = args.shift() || '';
    return {
        command,
        args,
    };
};
