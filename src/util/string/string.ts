/**
 * @author WMXPY
 * @namespace Util_String
 * @fileoverview Index
 */

import { ICommand } from "#/declare/service";

export const spaces = (length: number) => {
    return ' '.repeat(length);
};

export const stringToArgs = (str: string): ICommand => {
    const args: string[] = str.split(' ').filter((s: string) => Boolean(s.trim()));
    const command: string = args.shift() || '';
    return {
        command,
        args,
    };
};
